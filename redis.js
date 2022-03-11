//importing modules
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");

//importing classes and functions
const StoreConstructor = require("./routes/auth/storeWrapper");

//Configure redis client
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

//configuring RedisStore
const RedisStore = connectRedis(session); //constructor
const redisStore = new RedisStore({ client: redisClient });
const store = new StoreConstructor(redisStore);

module.exports = { redisStore, store };
