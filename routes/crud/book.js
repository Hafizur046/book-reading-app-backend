const express = require("express");
const bookRoutes = express.Router();
const multer = require("multer");
const { Book } = require("../../models");

const upload = multer({ dest: "uploads/" });

// POST /api/books
bookRoutes.post("/", upload.single("book"), async (req, res) => {
  const book = new Book({
    title: req.body.title || req.file.filename,
    thumbnail: "thumbnail",
    description: req.body.description,
    path: req.file.path,
  });
  await book.save();
  res.json(book);
});

// GET /api/books
bookRoutes.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

module.exports = bookRoutes;
