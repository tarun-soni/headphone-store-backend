import { gql } from 'apollo-server-core'

export const productTypeDefs = gql`
  "---all querys here---"
  type Query {
    "product queries"
    getAllProducts: [Product!]!
    getSingleProduct(id: ID!): Product!
    getTopRatedProducts: [Product!]!
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

  "delete return object"
  type deleteResponse {
    status: String!
    message: String!
  }

  "---all mutations here---"
  type Mutation {
    "creates a product from the userdata"
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

    "delete product returns message success or failed"
    deleteProduct(id: ID): deleteResponse!
    ""
    updateProduct(
      productId: ID!
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
