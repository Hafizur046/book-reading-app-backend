class StoreConstructor {
  constructor(redisStore) {
    this.redisStore = redisStore;

    // loop though all the methods in the redisStore and add them to the class
    // as any() methods
    // this is a bit of a hack, but it works
    for (let method in redisStore) {
      if (typeof redisStore[method] === "function") {
        this[method] = this.any(method);
      }
    }
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
}

module.exports = StoreConstructor;
