const express = require("express");
const session = require("express-session");
const { redisStore, store } = require("../redis");
const { bookRoutes } = require("./crud");

//initializing express router
const router = express.Router();

router.use(
  session({
    store: redisStore,
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

//importing routes
const authRoutes = require("./auth");

router.use("/auth", authRoutes({ store }));
router.use("/books", bookRoutes);

module.exports = router;
