const express = require("express");
const Message = require("../models/Message");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { uploader, cloudinary } = require("../config/cloudinary");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.render("/login");
  }
}

router.post("/message/history", ensureAuthenticated, (req, res, next) => {
  let { sender, receiver } = req.body;
  Message.find({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender },
    ],
  })
    .then((messages) => {
      console.log(messages);
      console.log(req.session.passport.user);
      res.json(messages);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/message/add", ensureAuthenticated, (req, res, next) => {
  let { sender, receiver, body } = req.body;

  User.findById(sender).then((senderObj) => {
    console.log("sender", senderObj);
    User.findById(receiver).then((receiverObj) => {
      console.log("receiver", receiverObj);
      Message.create({
        sender,
        receiver,
        body,
      })
        .then((message) => {
          res.json(message);
        })
        .catch((err) => {
          next(err);
        });
    });
  });
});

module.exports = router;
