const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/pets",
    failureRedirect: "/login",
    passReqToCallback: true,
  }),
  (req, res) => {}
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      return next(err);
    }
    if (!theUser) {
      res.render("auth/login", {
        message: req.flash("Wrong password or username"),
      });
      return;
    }
    req.login(theUser, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
  console.log("you logged out");
});

router.post("/signup", (req, res, next) => {
  const { username, password, email, city, state, zip } = req.body;
  if (password.length < 8) {
    res.render("auth/signup", {
      message: "Your password is too short.",
    });
    return;
  }
  if (username === "") {
    res.render("auth/signup", { message: "Username field cannot be empty" });
    return;
  }
  User.findOne({ username: username }).then((found) => {
    if (found !== null) {
      res.render("auth/signup", { message: "Username is already taken 🙊" });
    } else {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      User.create({
        username: username,
        password: hash,
        email: email,
        address: {
          city: city,
          state: state,
          zip: zip,
        },
      })
        .then(() => res.redirect("/login"))
        .catch((err) => {
          next(err);
        });
    }
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

module.exports = router;
