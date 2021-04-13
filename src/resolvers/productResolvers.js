import { AuthenticationError } from 'apollo-server-errors'
import Product from '../models/Product.js'

export const productResolvers = {
  // All product query definations
  Query: {},

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
          brand: args.brand,
          category: args.category,
          description: args.description,
          rating: args.rating,
          price: args.price,
          countInStock: args.countInStock
        })
        const createdProduct = await product.save()

        return createdProduct
      }
    }
  }
}
