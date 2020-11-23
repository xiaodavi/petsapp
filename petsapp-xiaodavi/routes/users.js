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

router.get('/users/:id', (req, res, next) => {
  const userId = req.params.id;
  User.find(userId).populate('pets')
  .then(user => {
    res.render('users/userProfile', {userProfile: user})
  })
  .catch(err => {
    next(err)
  })
})