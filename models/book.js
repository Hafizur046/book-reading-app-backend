const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
  title: String,
  thumbnail: String,
  description: String,
  path: String,
});

module.exports = mongoose.model("Book", bookSchema);
