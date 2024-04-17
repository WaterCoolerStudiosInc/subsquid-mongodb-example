import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import http from 'http'
import express from 'express'
import cors from 'cors'
import { connectToDatabase } from '../database'
import { Express } from 'express-serve-static-core'
import { TYPE_DEFS } from '../type-defs/type-defs'
import { RESOLVERS } from '../resolvers/resolvers'

export const app = express()

app.use(cors())
app.use(express.json())

const httpServer = http.createServer(app)

const startApolloServer = async(app: Express, httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
  await connectToDatabase()

  const server = new ApolloServer({
    typeDefs: TYPE_DEFS,
    resolvers: RESOLVERS,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  server.applyMiddleware({ app })
}

startApolloServer(app, httpServer)

export default httpServer