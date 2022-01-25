const { User } = require("../../models");
const getUserInfo = require("./github_user_info");

module.exports = async function githubAuthRoute(req, res) {
  console.log("sid:", req.session.id);
  console.log(req.session);
  const githubAccountInfo = await getUserInfo(req.query.code);
  if (!githubAccountInfo) {
    res.json({ error: "motherfucker stop tryinna do shits" });
    return;
  }

  let user = await User.findOne({ githubId: githubAccountInfo.id });
  if (!user) {
    const user = new User({
      username: githubAccountInfo.login,
      githubId: githubAccountInfo.id,
      avatarUrl: githubAccountInfo.avatar_url,
      githubUrl: githubAccountInfo.url,
      email: githubAccountInfo.email,
    });
    let dbResponse = await user.save();
    user = dbResponse;
  }

  req.session.userId = user._id;

  //console.log(githubAccountInfo);
  res.json({
    username: githubAccountInfo.username,
    avatarUrl: githubAccountInfo.avatar_url,
  });
};
