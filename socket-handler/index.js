const { Room } = require("../models");
const { store } = require("../redis");
const cookieParser = require("cookie-parser");
const cookie = require("cookie");

function SocketHandler(io) {
  return async (socket) => {
    const cookieString = socket.handshake.headers.cookie;
    if (cookieString) {
      const cookies = cookie.parse(cookieString);
      const sessionId = cookieParser.signedCookie(
        cookies["connect.sid"],
        process.env.SESSION_SECRET
      );
      const user = await store.get(sessionId);
      if (user?.userId) {
        socket.user = user;
        socket.emit("user-connected", user);
      }
    }
    socket.emit("welcome");
    socket.on("init", sendAvailablePublicRooms({ io, socket }));
    socket.on("create-room", createRoomHandler({ io, socket }));
    socket.on("join-room", joinRoomHandler({ io, socket }));
  };
}

function sendAvailablePublicRooms({ socket }) {
  return async () => {
    try {
      const rooms = await Room.find({ roomType: "public" });
      socket.emit("available-public-rooms", rooms);
    } catch (err) {
      console.log(err);
    }
  };
}

function joinRoomHandler({ io, socket }) {
  return async (data) => {
    try {
      const room = await Room.findById(data.roomId);
      if (!room) return;
      let isUserInside = false;
      room.currentlyInside.forEach((user) => {
        if (String(user.userId) === String(data.user.userId))
          isUserInside = true;
      });
      if (!isUserInside) room.currentlyInside.push(data.user);
      await room.save();
      socket.join(data.roomId);
      socket.emit("room-joined", room);
      io.to(data.roomId).emit("user-joined", data.user);
    } catch (err) {
      console.log(err);
    }
  };
}

function createRoomHandler({ io }) {
  return async (data) => {
    try {
      const room = new Room({
        name: data.name,
        roomType: data.roomType,
        author: data.user,
        currentlyInside: [],
        bookUrl: data.bookUrl,
      });
      const dbResponse = await room.save();
      if (data.roomType === "public") {
        io.emit("new-room", {
          _id: dbResponse._id,
          roomType: data.roomType,
          name: data.name,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = SocketHandler;
