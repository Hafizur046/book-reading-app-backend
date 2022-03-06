const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");
const socket = require("socket.io");
const SocketHandler = require("./socket-handler");

require("dotenv").config();

//connecting to database
mongoose.connect(process.env.DB_URI);
let db = mongoose.connection;
db.once("open", async (err) => {
  if (err) console.log(err);
});

const app = express();

//using the router
app.use("/api", router);

const server = app.listen(8080, () => {
  console.log("Server Started at port 8080");
});

//initiatlizing socket
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", SocketHandler(io));
