const { Session } = require("../../models");

function removeSession({ store }) {
  return async (req, res) => {
    function sessionReducer(arr, session) {
      try {
        if (req.params.sid === "all") return [];
        if (session.sid !== req.params.sid) return [...arr, session];
        return arr;
      } catch (err) {
        console.log(err);
      }
    }

    try {
      let session = await Session.findOne({ user_id: req.session.userId });
      if (req.params.sid === "me") req.params.sid = req.session.id;

      await session.sessions.forEach(async (sessionObject) => {
        if (req.params.sid !== "all" && req.params.sid !== sessionObject.sid)
          return;
        await store.destroy(sessionObject.sid);
      });

      session.sessions = session.sessions.reduce(sessionReducer, []);
      await session.save();
      res.json({});
    } catch (err) {
      console.log(err);
      res.json({ err: "Internal Server Error" });
    }
  };
}

module.exports = removeSession;
