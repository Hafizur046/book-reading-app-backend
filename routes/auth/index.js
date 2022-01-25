const express = require("express");
const authRoutes = express.Router();

const githubAuthRoute = require("./github");
const removeSession = require("./removeSession");

authRoutes.get("/github", githubAuthRoute);
authRoutes.get("/remove", removeSession);

module.exports = authRoutes;
