const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
    unique: true,
  },
  sessions: [
    {
      sid: { type: String, required: true },
      timestamp: { type: Date, required: true },
      device_name: { type: String, required: true },
    },
  ],
});

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
