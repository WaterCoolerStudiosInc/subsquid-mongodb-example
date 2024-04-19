"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("../src/database");
const type_defs_1 = require("../src/type-defs/type-defs");
const resolvers_1 = require("../src/resolvers/resolvers");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
const httpServer = http_1.default.createServer(exports.app);
const startApolloServer = async (app, httpServer) => {
    await (0, database_1.connectToDatabase)();
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: type_defs_1.TYPE_DEFS,
        resolvers: resolvers_1.RESOLVERS,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }), (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
    });
    await server.start();
    server.applyMiddleware({ path: '/graphql', app });
};
startApolloServer(exports.app, httpServer);
exports.app.listen(process.env.PORT || 4000, () => console.info('Server started'));
exports.default = httpServer;
