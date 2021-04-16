import { UserInputError } from 'apollo-server-errors'
import Order from '../models/Order.js'

export const orderResolvers = {
  Query: {
    getAllOrders: async () => {
      return await Order.find()
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

      // console.log('args :>> ', args)

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
          paidAt: paidAt,
          deliveredAt: null
        })

        const createdOrder = await order.save()

        return createdOrder
      }
    }
  }
}
