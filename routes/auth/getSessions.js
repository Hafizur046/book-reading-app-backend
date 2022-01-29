const { Session } = require("../../models");
async function getSessions(req, res) {
  try {
    let session = await Session.findOne({ user_id: req.session.userId });
    res.json(session.sessions);
  } catch (err) {
    console.log(err);
    res.json({ err: "Internal Server Error" });
  }
}

module.exports = getSessions;
