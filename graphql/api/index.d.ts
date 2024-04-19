/// <reference types="node" />
import http from 'http';
import { Express } from 'express-serve-static-core';
export declare const app: Express;
declare const httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
export default httpServer;
