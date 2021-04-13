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
    brand: String
    category: String
    description: String
    rating: Int
    price: Int
    countInStock: Int
  }

  # type ProductUser {
  #   _id: ID
  # }
  "---all mutations here---"
  type Mutation {
    createProduct(
      user: ID!
      name: String!
      image: String
      brand: String
      category: String
      description: String
      rating: Int
      price: Int
      countInStock: Int
    ): Product!
  }
`
