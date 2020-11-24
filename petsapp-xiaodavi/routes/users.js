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

// profile
router.get('/user-profile', ensureAuthenticated, (req, res, next) => {
  const userId = req.session.passport.user
  User.findById(userId)
  .then((user) => {
    // console.log(user);
    res.render("users/userProfile", { user: user });
  })
  .catch((err) => {
    next(err);
  });
})

router.get('/user-profile/edit', ensureAuthenticated, (req, res, next) => {
  User.findById(req.session.passport.user)
  .then((user) => {
    res.render("users/editProfile", {user: user})
  })
  .catch((err) => {
    next(err);
  });
})


router.post('/user-profile/edit', ensureAuthenticated, uploader.single("userImg"), (req, res, next) => {
  const {username, email, password} = req.body;
  let userImg;
  if(req.file) {
    userImg = req.file.path;
  } else {
    userImg = req. body.existingImage;
  }
  User.findByIdAndUpdate(req.session.passport.user, {
    username,
    email,
    password,
    userImg,
  },
  {new: true}
)
  .then(() => {
    res.redirect("/user-profile");
  })
  .catch((err) => {
    next(err);
  });
});


module.exports = router;