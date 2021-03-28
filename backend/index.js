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
  socket.on("send_chat_message", (message) => {
    // console.log("Message received", message);
    io.emit("chat_messages", message);
  });

  socket.on("give_all_users", () => {
    const users = [];
    for (let [id, _socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username: _socket.username,
      });
    }
    socket.emit("all_users", users);
  });

  // All but current socket
  socket.broadcast.emit("new_user_connected", {
    userID: socket.id,
    username: socket.username,
  });

  socket.on("send_private_message", ({ content, to }) => {
    // Send Message to Specific person
    socket.to(to).emit("private_messages", {
      content,
      from: socket.id,
      // timestamp: Date.parse(new Date()),
    });
  });
};
io.on("connection", onConnection);

server.listen(PORT, () => console.log(`Connected to PORT: ${PORT}`));
