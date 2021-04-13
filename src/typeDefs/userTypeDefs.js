import { gql } from 'apollo-server-core'

export const userTypeDefs = gql`
  "---all querys here---"
  type Query {
    "user queries"
    getAllUser: [User!]!
    getSingleUser(id: ID!): User
    getCurrentUser: User!
  }

  "user schema type"
  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
    isAdmin: Boolean
  }

  "---all mutations here---"
  type Mutation {
    "register or create user"
    createUser(
      name: String!
      email: String!
      password: String!
      isAdmin: Boolean
    ): User!

    "returns string bascically the jwt token"
    login(email: String!, password: String!): String!
  }
`
