const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const get = require("lodash/get");
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);

io.use((socket, next) => {
  const username = get(socket, "handshake.auth.username", "");
  if (!username) return next(new Error("INVALID_USERNAME"));
  socket.username = username;
  next();
});

const onConnection = (socket) => {
  socket.on("CHAT_MESSAGE", (message) => {
    console.log("Message received", message);
  });

  socket.on("ALL_USERS", () => {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username: socket.username,
      });
    }
    socket.emit("USERS", users);
  });
};
io.on("connection", onConnection);

server.listen(PORT, () => console.log(`Connected to PORT: ${PORT}`));
