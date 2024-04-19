import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import http from 'http'
import express from 'express'
import cors from 'cors'
import { connectToDatabase } from '../src/database'
import { Express } from 'express-serve-static-core'
import { TYPE_DEFS } from '../src/type-defs/type-defs'
import { RESOLVERS } from '../src/resolvers/resolvers'

export const app = express()

app.use(cors())
app.use(express.json())

const httpServer = http.createServer(app)

const startApolloServer = async(app: Express, httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
  await connectToDatabase()

  const server = new ApolloServer({
    typeDefs: TYPE_DEFS,
    resolvers: RESOLVERS,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageGraphQLPlayground()],
  })

  await server.start()
  server.applyMiddleware({ path: '/graphql', app })
}

startApolloServer(app, httpServer)

app.listen(process.env.PORT || 4000, () => console.info('Server started'))

export default httpServer
