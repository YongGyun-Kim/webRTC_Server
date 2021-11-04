const http = require("http");
const SocketIo = require("socket.io");
const express = require("express");
const app = express();

const httpServer = http.createServer(app);
const webSocketServer = SocketIo(httpServer);

app.get("/", (req, res) => console.log("/"));
webSocketServer.on("connection", (socket) => {
  console.log(socket);
});

httpServer.listen(8000, console.log("start server"));
