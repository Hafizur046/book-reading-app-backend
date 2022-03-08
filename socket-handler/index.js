const { Room } = require("../models");

function SocketHandler(io) {
  return (socket) => {
    socket.emit("welcome");
    socket.on("init", sendAvailablePublicRooms({ io, socket }));
    socket.on("create-room", createRoomHandler({ io, socket }));
    socket.on("join-room", joinRoomHandler({ io, socket }));
  };
}

function sendAvailablePublicRooms({ socket }) {
  return async () => {
    const rooms = await Room.find({ roomType: "public" });
    socket.emit("available-public-rooms", rooms);
  };
}

function joinRoomHandler({ io, socket }) {
  return async (data) => {
    const room = await Room.findById(data.roomId);
    if (!room) return;
    room.currentlyInside.push(data.user);
    await room.save();
    socket.join(data.roomId);
    io.to(data.roomId).emit("user-joined", data.user);
  };
}

function createRoomHandler({ io }) {
  return async (data) => {
    const room = new Room({
      name: data.name,
      roomType: data.roomType,
      author: data.user,
      currentlyInside: [],
      bookUrl: data.bookUrl,
    });
    const dbResponse = await room.save();
    //socket.join(dbResponse._id);
    if (data.roomType === "public") {
      io.emit("new-room", { roomId: dbResponse._id });
    }
  };
}

module.exports = SocketHandler;
