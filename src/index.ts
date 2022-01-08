import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from "cors";
import { ModelsHandler } from './ModelsHandler';
import { TextDiscussion, TextDiscussionSchema } from './Models/TextDiscussion';
import { Message } from './Models/Message';
import { HydratedDocument } from 'mongoose';

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017');
mongoose.Promise = global.Promise

const modelHandler = new ModelsHandler();

const app = express();
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

// Hearthbeat
app.get("/", (request, response) => {
    response.sendStatus(200).send("Success")
})

// Get Discussion by id
app.get("/textdiscussion/:id", async (request, response) => {
  const discussionId = request.params.id;
  let discussion = await modelHandler.getObject<TextDiscussion>("TextDiscussion", discussionId, TextDiscussionSchema)
  if (discussion === null) {
    response.sendStatus(404);
  }
  response.send(discussion)
})

// Create new Discussion
app.post("/textdiscussion", async (request, response) => {
  const messages = new Array<Message>()
  const discussion = await modelHandler.getNewObject<TextDiscussion>("TextDiscussion", { messages }, TextDiscussionSchema);
  response.send(discussion)
})

io.on('connection', function(socket) {
  const discussionId = socket.handshake.query.textDiscussionId as string;
  console.log()
  console.log('a user connected');
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  // When recieving message, send the message to all users
  socket.on("chat_message", async (payload) => {
    await addMessageToDiscussion(payload, discussionId)
    io.emit("chat_message", payload);
  });
});

async function addMessageToDiscussion (message: Message, discussionId: string) {
  const discussion = (await modelHandler.getObject<TextDiscussion>("TextDiscussion", discussionId, TextDiscussionSchema)) as HydratedDocument<TextDiscussion>
  discussion.messages.push(message);
  discussion.save();
}

// Server start
server.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
