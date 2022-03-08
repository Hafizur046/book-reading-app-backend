const mongoose = require("mongoose");

const userSubDoc = (indexed) => ({
  username: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: indexed,
  },
});

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomType: { type: String, required: true },
  author: userSubDoc(true),
  currentlyInside: [userSubDoc(false)],
  bookUrl: { type: String, required: true },
  currentPage: { type: Number, default: 0 },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
