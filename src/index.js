import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import expressJwt from 'express-jwt'
import dotenv from 'dotenv'
import cors from 'cors'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'

import { userResolvers } from './resolvers/userResolvers.js'
import { userTypeDefs } from './typeDefs/userTypeDefs.js'
import { productTypeDefs } from './typeDefs/productTypeDefs.js'
import { productResolvers } from './resolvers/productResolvers.js'
import jwt from 'jsonwebtoken'

dotenv.config()
const app = express()
app.use(cors())
app.use(
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false
  })
)
app.get('/api/users/me', async (req, res) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      await res.send(decoded.user)
    } catch (error) {
      console.error('error in auth middleware :>> ', error)
      res.status(401).send({
        message: 'Please Login'
      })
      // throw new Error('Not authorized, token failed')
    }
  }
  if (!token) {
    res.status(401).send({
      message: 'Please Login'
    })
  }
})
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
      const user = req.user || null
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
