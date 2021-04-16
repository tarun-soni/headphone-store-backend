import { gql } from 'apollo-server-core'

export const orderTypeDefs = gql`
  "---all querys here---"
  type Query {
    getAllOrders: [AllOrderReturn]!
    getOrderById(id: ID!): SingleOrderReturn!
    getMyOrders: [SingleOrderReturn]
  }

  "used in QUERY getAllOrders for return"
  type AllOrderReturn {
    _id: ID
    userId: ID
    orderItems: [OrderItemToReturn!]
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

  type SingleOrderReturn {
    totalPrice: Int
    isPaid: Boolean
    isDelivered: Boolean
    _id: ID!
    orderItems: [OrderItemToReturn!]!
    userId: UserToReturn!
    shippingAddress: String
    paidAt: String
  }

  type UserToReturn {
    name: String
    email: String
    _id: ID
  }

  type OrderItemToReturn {
    name: String!
    qty: Int!
    image: String!
    price: Int!
    productId: ID!
  }

  "used in mutation createorder for input"
  input OrderItemInput {
    name: String!
    qty: Int!
    image: String!
    price: Int!
    productId: String!
  }

  "used in createorder for return"
  type Order {
    userId: ID
    orderItems: [OrderItem!]
    shippingAddress: String!
    totalPrice: Int!
    isPaid: Boolean!
    paidAt: String!
  }

  "---all mutations here---"
  type Mutation {
    createOrder(
      userId: String
      orderItems: [OrderItemInput]
      shippingAddress: String
      totalPrice: Int!
      isPaid: Boolean
      paidAt: String
    ): Order
  }
`
