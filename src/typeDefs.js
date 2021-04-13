import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  "all querys here"
  type Query {
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

  "all mutations"
  type Mutation {
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
