const { User, Session } = require("../../models");
const getUserInfo = require("./github_user_info");

module.exports = async function githubAuthRoute(req, res) {
  try {
    console.log(req.session);
    const githubAccountInfo = await getUserInfo(req.query.code);
    if (!githubAccountInfo) {
      res.json({ error: "motherfucker stop tryinna do shits" });
      return;
    }

    let user = await User.findOne({ githubId: githubAccountInfo.id });
    let session = user && (await Session.findOne({ user_id: user._id }));
    if (!user) {
      user = new User({
        username: githubAccountInfo.login,
        githubId: githubAccountInfo.id,
        avatarUrl: githubAccountInfo.avatar_url,
        githubUrl: githubAccountInfo.url,
        email: githubAccountInfo.email,
      });
      let dbResponse = await user.save();
      user = dbResponse;
      session = new Session({ user_id: user._id });
    }

    //this session would be later used to allow individual session destroy action
    session.sessions.push({
      sid: req.session.id,
      timestamp: new Date(),
      device_name: "Generic123",
    });
    await session.save();

    req.session.userId = user._id;
    req.session.githubId = githubAccountInfo.id;
    req.session.username = githubAccountInfo.login;

    //console.log(githubAccountInfo);
    res.json({
      username: githubAccountInfo.login,
      avatarUrl: githubAccountInfo.avatar_url,
    });
  } catch (err) {
    console.log(err);
  }
};
