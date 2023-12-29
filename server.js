const express = require("express");
const userRouter = require("./router/user");
const connectDb = require("./connection/db");
const cors = require("cors");
const imageRouter = require("./router/images");
const videoRouter = require("./router/videos");
const messageRouter = require("./router/message");
require("dotenv").config();
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const { createServer } = require("node:http");

const app = express();

const PORT = process.env.PORT;
connectDb();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }))

// making middleware for differnt-different API call
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use("/api/video", videoRouter);
app.use("/api/message", messageRouter);

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

io.on("connection", (Socket) => {
  Socket.on("join chat", (data) => {
    Socket.join(data);
  });
  Socket.on("new message", (data, roomId) => {
    room = roomId;
    Socket.in(roomId).emit("message", data);
  });
});

server.listen(PORT, () => {
  console.log(`Instagram is running on port ${PORT}`);
});
