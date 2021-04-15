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
      return dayjs(value).format('DD-MM-YYYY')
    },
    parseValue(value) {
      return dayjs(value)
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return dayjs(ast.value)
      } else {
        return null
      }
    }
  }),

  Mutation: {
    // create a new order from input
    // auth only
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
