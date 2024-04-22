// api/graphql.ts

import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { connectToDatabase } from '../src/database';
import { TYPE_DEFS } from '../src/type-defs/type-defs';
import { RESOLVERS } from '../src/resolvers/resolvers';
import Cors from 'micro-cors';

const cors = Cors();

const server = new ApolloServer({
  typeDefs: TYPE_DEFS,
  resolvers: RESOLVERS,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await startServer;
  await connectToDatabase(); // Connect to your database here
  return server.createHandler({ path: '/api/graphql' })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
