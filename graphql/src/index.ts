import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault} from 'apollo-server-core'
import http from 'http'
import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './database'
import { Express } from 'express-serve-static-core'
import { TYPE_DEFS } from './type-defs/type-defs'
import { RESOLVERS } from './resolvers/resolvers'

export const app = express()

app.use(cors())
app.use(express.json())

const httpServer = http.createServer(app)

const startApolloServer = async(app: Express, httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
  await connectToDatabase()

  // https://the-guild.dev/graphql/codegen/docs/getting-started#to-the-back-end
  const server = new ApolloServer({
    typeDefs: TYPE_DEFS,
    resolvers: RESOLVERS,
    introspection: true,
  
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ],
  })

  await server.start()
  server.applyMiddleware({ path: '/graphql', app })
}

startApolloServer(app, httpServer)

app.listen(process.env.PORT || 4000, () => console.info('Server started'))

export default httpServer
