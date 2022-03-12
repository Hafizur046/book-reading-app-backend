class StoreConstructor {
  constructor(redisStore) {
    this.redisStore = redisStore;

    // loop though all the methods in the redisStore and add them to the class
    // as any() methods
    // this is a bit of a hack, but it works
    //for (let method in redisStore) {
    //if (typeof redisStore[method] === "function") {
    //this[method] = this.any(method);
    //}
    //}
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
  clear = this.any("clear");
  destroy = this.any("destroy");
  get = this.any("get");
  ids = this.any("ids");
  set = this.any("set");
  touch = this.any("touch");
}

module.exports = StoreConstructor;
