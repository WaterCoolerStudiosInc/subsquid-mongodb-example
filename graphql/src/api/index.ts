import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "../database";
import { Express } from "express-serve-static-core";
import { StakedResolver } from '../resolvers/staked-resolver'
import { TYPE_DEFS } from "../schema";

export const app = express();

app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

const resolvers = StakedResolver

const startApolloServer = async(app: Express, httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
  await connectToDatabase();

  const server = new ApolloServer({
    typeDefs: TYPE_DEFS,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer(app, httpServer);

export default httpServer;