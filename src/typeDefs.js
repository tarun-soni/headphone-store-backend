import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  "all querys here"
  type Query {
    getAllUser: [User!]!
    user(id: ID!): User
    viewer: User!
  }
  "user schema type"
  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
    roles: String
    permissions: String
  }

  "all mutations"
  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      roles: String
      permissions: String
    ): User!

    "returns string bascically the jwt token"
    login(email: String!, password: String!): String!
  }
`
