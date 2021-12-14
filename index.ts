import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from "cors";

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

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  // When recieving message, send the message to all users
  socket.on("chat_message", (payload) => {
    io.emit("chat_message", payload);
  });
});

// Server start
server.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
