import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from "cors";
const app = express();
const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};
app.use(cors(corsOptions));
const server = http.createServer(app);
const port = 3000;
const io = new Server(server, {
    cors: corsOptions
});

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat_message", (payload) => {
    io.emit("chat_message", payload);
  });
});

server.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
