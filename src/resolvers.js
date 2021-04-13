import { User } from './models/User.js'
import bcrypt from 'bcryptjs'
import generateToken from './utils/generateToken.js'
import { AuthenticationError } from 'apollo-server-errors'

export const resolvers = {
  Query: {
    // getAllUser: () => User.find(),

    getAllUser: async (_, __, context) => {
      if (!context || !context.user) {
        throw new AuthenticationError(`No token`)
      } else {
        const {
          user: { isAdmin }
        } = context.user

        if (isAdmin === true) return User.find().select('-password')
        else throw new AuthenticationError(`You are not and ADMIN`)
      }
    },

    getSingleUser(_, args, context, info) {
      if (!args) throw new AuthenticationError(`NO args passed`)
      return User.findById(args.id)
    },

    getCurrentUser: async (_, __, context) => {
      if (!context || !context.user) {
        throw new AuthenticationError(`NO token`)
      }
      // return User.findById(args.id).select('-password')
      const {
        user: { _id }
      } = context.user

      const user = await User.findById(_id).select('-password')
      return user
    }
  },
  // all mutation definations
  Mutation: {
    // parent, args, context
    createUser: async (_, { name, email, password, isAdmin }) => {
      let userCheck = await User.findOne({ email })

      if (userCheck) {
        throw new AuthenticationError('USER ALREADY EXISTS')
      }
      const hashedPass = await bcrypt.hash(password, 12)

      let user = new User({
        name,
        email,
        password: hashedPass,
        isAdmin
      })
      await user.save()
      return user
    },

    // login mutation
    login: async (_, { email, password }, context) => {
      try {
        const user = await User.findOne({ email })
        const userWOpass = await User.findOne({ email }).select('-password')
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = generateToken(userWOpass)
          return token
        } else {
          throw new AuthenticationError(`INVALID CREDS`)
        }
      } catch (error) {
        throw new AuthenticationError(
          `ERROR IN LOGIN, MESSAGE:${error.message}`
        )
      }
    }
  }
}
