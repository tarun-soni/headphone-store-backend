import { gql } from 'apollo-server-core'

export const productTypeDefs = gql`
  "---all querys here---"
  type Query {
    "product queries"
    getAllProducts: [Product!]!
    getSingleProduct(id: ID!): Product
  }

  "product schema type"
  type Product {
    _id: ID!
    user: ID!
    name: String!
    image: String
    description: String
    rating: Int
    price: Int
    countInStock: Int
    colors: [COLORSENUM!]
  }

  "enum for product colors"
  enum COLORSENUM {
    RED
    GREEN
    BLUE
    BLACK
    YELLOW
  }
  "---all mutations here---"
  type Mutation {
    createProduct(
      user: ID!
      name: String!
      image: String
      description: String
      rating: Int
      price: Int
      countInStock: Int
      colors: [COLORSENUM!]
    ): Product!
  }
`
