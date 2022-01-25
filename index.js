const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");

require("dotenv").config();

//connecting to database
mongoose.connect(process.env.DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
let db = mongoose.connection;
db.once("open", async (err) => {
  if (err) console.log(err);
});

const app = express();

//using the router
app.use("/api", router);

app.listen(8080, () => {
  console.log("Server Started at port 8080");
});
