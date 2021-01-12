const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res, next) => {
  console.log(req.session);
  res.render("index", { user: req.session.passport });
});

module.exports = router;
