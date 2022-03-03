import express, { json } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from "cors";
import { ModelsHandler } from './ModelsHandler';
import { TextDiscussion } from './Domain/Models/TextDiscussion';
import { Message } from './Domain/Models/Message';
import { HydratedDocument } from 'mongoose';
import { InjectionHandler } from './InjectionHandler';
import dotenv from 'dotenv'
import { TextDiscussionSchema } from './Application/Schema/TextDiscussionSchema';
import { SchemaHandler } from './Application/Schema/SchemaHandler';
dotenv.config()
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/yell');
mongoose.Promise = global.Promise

const modelHandler = new ModelsHandler();

const app = express();
app.use(json());
const port = 3000;

//Cors
const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};
app.use(cors(corsOptions));

//HttpServer
const server = http.createServer(app);

//Socket io
const io = new Server(server, {
    cors: corsOptions
});
const injectionHandler = new InjectionHandler();
injectionHandler.inject(io);
const schemaHandler = new SchemaHandler(injectionHandler.modelHandler);
schemaHandler.initSchema();
injectionHandler.routeHandler.setupRoutes(app, io);
// Hearthbeat
app.get("/", (request, response) => {
    response.sendStatus(200).send("Success")
})
// Server start
server.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
