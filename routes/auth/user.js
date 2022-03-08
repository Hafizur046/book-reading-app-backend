const getOwnDetails = (req, res) => {
  res.json({
    userId: req.session.userId,
    githubId: req.session.githubId,
    avatarUrl: req.session.avatarUrl,
    username: req.session.username,
  });
};

module.exports = getOwnDetails;
