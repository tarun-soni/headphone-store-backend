import { UserInputError, ValidationError } from 'apollo-server-errors'
import Order from '../models/Order.js'

export const orderResolvers = {
  Query: {
    getAllOrders: async () => {
      return await Order.find().populate('userId')
    },

    getOrderById: async (_, args, context) => {
      const order = await Order.findById(args.id).populate('userId')

      if (order) {
        return order
      } else {
        throw new ValidationError('Order not found')
      }
    },

    getMyOrders: async (_, args, context) => {
      if (!context || !context.user) {
        throw new AuthenticationError(`NO token`)
      }
      const {
        user: { _id }
      } = context.user

      const orders = await Order.find({ userId: _id })
      return orders
    }
  },

  Mutation: {
    // create a new order from input
    // auth only
    createOrder: async (_, args, context) => {
      const {
        userId,
        shippingAddress,
        orderItems,
        paidAt,
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
          paidAt: paidAt
        })

        const createdOrder = await order.save()

        return createdOrder
      }
    }
  }
}
