import express from "express";
import "dotenv/config";
import http from "http";

const app = express();
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

io.on("connection", (socket) => {
  socket.on("mymessage", (data) => {
    console.log(data);
    socket.broadcast.emit("message_receiver", data);
  });
});

const PORT = process.env.PORT ?? 8080;
server.listen(PORT, () => console.log("Server is running on", PORT));
