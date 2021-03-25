const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);

const onConnection = (socket) => {
  console.log("🚀 ~ file: index.js ~ line 12 ~ onConnection ~ socket", socket);
  socket.on("Chat Message", (message) => {
    console.log("🚀 ~ file: index.js ~ line 15 ~ socket.on ~ message", message);
    io.emit("chat message", message);
  });
};
io.on("connection", onConnection);

server.listen(PORT, () => console.log(`Connected to PORT: ${PORT}`));
