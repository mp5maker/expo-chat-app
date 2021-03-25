const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);

const onConnection = (socket) => {
  console.log("New user is connected", socket);
  socket.on("CHAT_MESSAGE", (message) => {
    console.log("Message received", message);
    io.emit("BROADCAST_CHAT_MESSAGE", message);
  });
};
io.on("connection", onConnection);

server.listen(PORT, () => console.log(`Connected to PORT: ${PORT}`));
