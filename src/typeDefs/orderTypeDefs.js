import { gql } from 'apollo-server-core'

export const orderTypeDefs = gql`
  "---all querys here---"
  type Query {
    getAllOrders: [Order]!
  }

  type Order {
    userId: ID
    orderItems: [OrderItem!]
    shippingAddress: String
    totalPrice: Int
    isPaid: Boolean
    paidAt: String
    isDelivered: Boolean
    deliveredAt: String
  }

  type OrderItem {
    name: String!
    qty: Int
    image: String
    price: Int
    productId: ID
  }

  input OrderItemInput {
    name: String!
    qty: Int!
    image: String!
    price: Int!
    productId: String!
  }

  "---all mutations here---"
  type Mutation {
    createOrder(
      userId: String
      orderItems: [OrderItemInput]
      shippingAddress: String
      totalPrice: Int!
      isPaid: Boolean
      isDelivered: Boolean
      paidAt: String
      deliveredAt: String
    ): Order
  }
`
