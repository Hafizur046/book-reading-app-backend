const requiredAuth = (req, res, next) => {
  if (req.session.username) {
    next();
    return;
  }
  res.status(401).json({ error: "Authentication required" });
  return;
};

module.exports = requiredAuth;
