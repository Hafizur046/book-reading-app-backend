const { Session } = require("../../models");

function removeSession({ store }) {
  return async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
      res.json({ err: "Internal Server Error" });
    }
  };
}

module.exports = removeSession;
