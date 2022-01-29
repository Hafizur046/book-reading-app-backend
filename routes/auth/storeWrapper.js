function any(method) {
  return (sid, session) => {
    let task = new Promise((resolve, reject) => {
      function callback(err, data) {
        if (err) reject(err);
        resolve(data);
      }
      this.redisStore[method](sid || callback, session || callback, callback);
    });
    return task;
  };
}

class StoreConstructor {
  constructor(redisStore) {
    this.redisStore = redisStore;
  }
  all = any("all");
  distroy = any("distroy");
  clear = any("clear");
  length = any("length");
  get = any("get");
  set = any("set");
  touch = any("touch");
}

module.exports = StoreConstructor;
