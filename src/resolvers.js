import { User } from './models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import generateToken from './utils/generateToken.js'
import { AuthenticationError } from 'apollo-server-errors'

export const resolvers = {
  Query: {
    getAllUser: () => User.find(),
    user(parent, args, context, info) {
      return User.findById(args.id)
    },

    viewer(parent, args, { user }) {
      return User.find(({ id }) => id === User.sub)
    }
  },

  // all mutation definations
  Mutation: {
    // parent, args, context
    createUser: async (_, { name, email, password, roles, permissions }) => {
      let userCheck = await User.findOne({ email })

      if (userCheck) {
        throw new AuthenticationError('USER ALREADY EXISTS')
      }
      const hashedPass = await bcrypt.hash(password, 12)

      let user = new User({
        name,
        email,
        password: hashedPass,
        roles,
        permissions
      })

      await user.save()
      return user
    },

    // login mutation
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = await generateToken(user._id)
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
