//js 큐 성능 찾아볼것

const http = require("http");
const SocketIo = require("socket.io");
const express = require("express");
// const cors = require("cors");
const app = express();
const events = require("./events.json");

const Queue = require("./queue");
const userQueue = new Queue();

const httpServer = http.createServer(app);
const io = SocketIo(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => console.log("/"));
io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    // RTC event 찾아볼것
  });

  socket.on(events.QUEUE_REGISTRATION, (data) => {
    //queue에 집어넣고
    // console.log(data);
    console.log(userQueue);
  });

  socket.emit(events.MATCHING, (data) => {
    //rtc
    console.log("");
  });
});

httpServer.listen(8000, console.log("start server"));
