//js 큐 성능 찾아볼것

const http = require("http");
const SocketIo = require("socket.io");
const express = require("express");
// const cors = require("cors");
const app = express();
const events = require("./events.json");

const UserQueue = require("./userQueue");
const userQueue = new UserQueue();

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
    //대기열 등록 후 매칭전 나갔을때
  });

  socket.on(events.QUEUE_REGISTRATION, (data) => {
    const firstUser = userQueue.getFirstUser();

    if (firstUser !== undefined) {
      io.to(firstUser.id).emit("matching", {
        id: socket.id,
        nickName: data,
      });
      userQueue.dequeue();
    } else {
      userQueue.enqueue({ id: socket.id, nickName: data });
    }
  });

  socket.emit(events.MATCHING, (data) => {
    //rtc
    console.log("");
  });
});

httpServer.listen(8000, console.log("Start Server"));
