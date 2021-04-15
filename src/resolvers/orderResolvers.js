import { UserInputError } from 'apollo-server-errors'
import { GraphQLScalarType, Kind } from 'graphql'
import dayjs from 'dayjs'
import Order from '../models/Order.js'

export const orderResolvers = {
  Query: {
    getAllOrders: async () => {
      return await Order.find()
    }
  },

  MyDate: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      return dayjs(value).format('DD-MM-YYYY') // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
      return dayjs(value) // Convert incoming integer to Date
    },
    parseLiteral(ast) {
      console.log(`ast.value`, ast.value)
      console.log(`ast.kind`, ast.kind)
      console.log(`KIND.STRING`, Kind.STRING)

      if (ast.kind === Kind.STRING) {
        console.log(`dayjs(ast.value)`, dayjs(ast.value))
        return dayjs(ast.value) // Convert hard-coded AST string to integer and then to Date
      } else {
        return null // Invalid hard-coded value (not an integer)
      }
    }
  }),

  Mutation: {
    // create a new product from input
    // admin only
    createOrder: async (_, args, context) => {
      const {
        userId,
        shippingAddress,
        orderItems,
        paidAt,
        deliveredAt,
        totalPrice,
        isPaid,
        isDelivered
      } = args

      console.log(`paidAt`, dayjs(paidAt))
      console.log(`deliveredAt`, dayjs(deliveredAt))
      if (orderItems && orderItems.length === 0) {
        throw new UserInputError('No order items')
      } else {
        const order = new Order({
          orderItems,
          userId,
          shippingAddress,
          totalPrice,
          isPaid,
          isDelivered,
          paidAt: dayjs(paidAt),
          deliveredAt: dayjs(deliveredAt)
        })

        const createdOrder = await order.save()

        return createdOrder
      }
    }
  }
}
