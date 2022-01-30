const getOwnDetails = (req, res) => {
  res.json({
    userId: req.session.userId,
    githubId: req.session.githubId,
    username: req.session.username,
  });
};

module.exports = getOwnDetails;
