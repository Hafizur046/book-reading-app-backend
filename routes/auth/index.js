const express = require("express");
const authRoutes = express.Router();

module.exports = ({ store }) => {
  const githubAuthRoute = require("./github");
  const getSessions = require("./getSessions");
  const removeSession = require("./removeSession");
  const getOwnDetails = require("./user");

  authRoutes.get("/github", githubAuthRoute);
  authRoutes.get("/sessions", getSessions);
  authRoutes.get("/me", getOwnDetails);
  authRoutes.delete("/remove/:sid", removeSession({ store }));
  return authRoutes;
};
