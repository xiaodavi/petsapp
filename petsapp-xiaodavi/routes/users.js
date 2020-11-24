const express = require("express");
const User = require("../models/User");
const Pet = require("../models/Pet");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { uploader, cloudinary } = require('../config/cloudinary');

// middleware function
function ensureAuthenticated (req, res, next) {
  if(req.isAuthenticated ()) {
    // the user is authenticated
    return next()
  } else {
    res.render('/login')
  }
}

// profile ???? don't work
router.get('/user', ensureAuthenticated, (req, res, next) => {
  User.findById(req.session.passport.user)
  .then((user) => {
    // console.log(user);
    res.render("users/userProfile", { user: user });
  })
  .catch((err) => {
    next(err);
  });
})

// router.get("/register-pets", ensureAuthenticated, (req, res, next) => {
//   // console.log(req.session);
//    User.findById(req.session.passport.user)
//      .then((user) => {
//        // console.log(user);
//        res.render("users/register-pets", { user: user });
//      })
//      .catch((err) => {
//        next(err);
//      });
//  });