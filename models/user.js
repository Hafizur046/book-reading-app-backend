const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  githubId: { type: Number, required: true, index: true },
  avatarUrl: { type: String, required: true },
  githubUrl: { type: String, required: true },
  email: { type: String, required: true },
});

let User = mongoose.model("User", userSchema);
module.exports = User;
