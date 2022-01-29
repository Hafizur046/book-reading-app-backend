const express = require("express");
const authRoutes = express.Router();

module.exports = ({ store }) => {
  const githubAuthRoute = require("./github");
  const removeSession = require("./removeSession");

  authRoutes.get("/github", githubAuthRoute);
  authRoutes.get("/remove", removeSession({ store }));
  return authRoutes;
};
