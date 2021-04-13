import { AuthenticationError } from 'apollo-server-errors'
import Product from '../models/Product.js'

export const productResolvers = {
  // All product query definations
  Query: {
    // get all products
    // everyone
    getAllProducts: async () => {
      return await Product.find()
    },

    // get one product by ID
    // auth only
    getSingleProduct: async (_, args, context) => {
      if (!args) throw new AuthenticationError(`NO args passed`)

      if (!context || !context.user) {
        throw new AuthenticationError(`No token`)
      } else {
        return await Product.findById(args.id)
      }
    },
    // get top 5 products by rating
    // everyone
    getTopRatedProducts: async () => {
      return await Product.find({}).sort({ rating: -1 }).limit(5) //rating -1 coz sort by rating ascending
    }
  },
  // All mutation definations
  Mutation: {
    createProduct: async (_, args, context) => {
      if (!context || !context.user) {
        throw new AuthenticationError(`No token`)
      } else {
        const {
          user: { _id, isAdmin }
        } = context.user

        if (!isAdmin) {
          throw new AuthenticationError(`You are not an ADMIN`)
        }

        const product = new Product({
          user: _id,
          name: args.name,
          image: args.image,

          description: args.description,
          rating: args.rating,
          price: args.price,
          countInStock: args.countInStock,
          colors: args.colors
        })
        const createdProduct = await product.save()

        return createdProduct
      }
    },

    //
    //
    deleteProduct: async (_, args, context) => {
      if (!context || !context.user) {
        throw new AuthenticationError(`No token`)
      }
      const {
        user: { isAdmin }
      } = context.user

      if (!isAdmin) {
        throw new AuthenticationError(`You are not an ADMIN`)
      }
      const product = await Product.findById(args.id)

      if (product) {
        await product.remove()
        return { status: 'success', message: 'Successfully Deleted product' }
      } else {
        return { status: 'failed', message: 'Product not Found' }
      }
    } //delete product
  } //mutation
}
