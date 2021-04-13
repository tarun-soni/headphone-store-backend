import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import expressJwt from 'express-jwt'
import dotenv from 'dotenv'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'

import { userResolvers } from './resolvers/userResolvers.js'
import { userTypeDefs } from './typeDefs/userTypeDefs.js'
import { productTypeDefs } from './typeDefs/productTypeDefs.js'
import { productResolvers } from './resolvers/productResolvers.js'

dotenv.config()
const app = express()

app.use(
  expressJwt({
    secret: 'testsecret',
    algorithms: ['HS256'],
    credentialsRequired: false
  })
)

const startServer = async () => {
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.log('db connected')
  })

  const server = new ApolloServer({
    typeDefs: mergeTypeDefs([userTypeDefs, productTypeDefs]),
    resolvers: mergeResolvers([userResolvers, productResolvers]),
    context: ({ req, res }) => {
      const token = req.headers.authorization || ''
      const user = req.user || null
      // if (!user) throw new AuthenticationError('you must be logged in')

      return { user }
    }
  })

  server.applyMiddleware({ app })
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  app.listen({ port: 4000 }, () => {
    console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at http://localhost:4000${server.graphqlPath}
  `)
  })
}

startServer()
