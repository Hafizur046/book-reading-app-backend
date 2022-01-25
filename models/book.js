const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({});

module.exports = mongoose.model("Book", bookSchema);
