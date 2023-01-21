const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", function (request, respons) {
  respons.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

users = [];
connections = [];

io.sockets.on("connection", (socket) => {
  console.log("Новый пользователь");
  connections.push(socket);

  socket.on("disconnect", function (data) {
    console.log("Пользователь отключился");
    connections.splice(connections.indexOf(socket), 1);
  });
  socket.on("send mess", (data) => {
    io.sockets.emit("add mess", {
      mess: data.mess,
      name: data.name,
    });
  });
});
