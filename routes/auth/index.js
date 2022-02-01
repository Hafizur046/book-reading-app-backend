const express = require("express");
const authRoutes = express.Router();

module.exports = ({ store }) => {
  const githubAuthRoute = require("./github");
  const getSessions = require("./getSessions");
  const removeSession = require("./removeSession");
  const getOwnDetails = require("./user");
  const requiredAuth = require("./requiredAuth");

  authRoutes.get("/github", githubAuthRoute);
  authRoutes.get("/sessions", requiredAuth, getSessions);
  authRoutes.get("/me", requiredAuth, getOwnDetails);
  authRoutes.delete("/remove/:sid", requiredAuth, removeSession({ store }));
  return authRoutes;
};
