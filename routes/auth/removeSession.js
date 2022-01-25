const session = require("express-session");
let RedisStore = require("connect-redis")(session);

module.exports = async function removeSession(req, res) {
  //RedisStore.all();
  function redisCallback(data) {
    console.log(data);
  }
  res.json();
};
