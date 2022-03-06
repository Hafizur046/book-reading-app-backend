function SocketHandler(io) {
  return (socket) => {
    socket.emit("welcome");
  };
}

module.exports = SocketHandler;
