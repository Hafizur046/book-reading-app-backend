class StoreConstructor {
  constructor(redisStore) {
    this.redisStore = redisStore;
  }
  any(method) {
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
  all = this.any("all");
  distroy = this.any("distroy");
  clear = this.any("clear");
  length = this.any("length");
  get = this.any("get");
  set = this.any("set");
  touch = this.any("touch");
}

module.exports = StoreConstructor;
