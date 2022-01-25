const express = require("express");
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");

//initializing express router
const router = express.Router();

//Configure redis client
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
  legacyMode: true,
});
redisClient.connect();
redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function () {
  console.log("Connected to redis successfully");
});

//router.set("trust proxy", 1); // trust first proxy
//configuring express -session
const store = new RedisStore({ client: redisClient });
router.use(
  session({
    store: store,
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

store.all((err, data) => console.log(data));

//importing routes
const authRoutes = require("./auth");

router.use("/auth", authRoutes);

module.exports = router;
