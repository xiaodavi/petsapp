const express = require("express");
const Message = require("../models/Message");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { uploader, cloudinary } = require("../config/cloudinary");

// middleware function
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // the user is authenticated
    return next();
  } else {
    res.render("/login");
  }
}

// router.get("/message/history", ensureAuthenticated, (req, res, next) => {
//   // console.log(req.params);
//   res.render("match/chat");
// });

router.post("/message/history", ensureAuthenticated, (req, res, next) => {
  let { sender, receiver } = req.body;
  // console.log(req.session);
  Message.find({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender },
    ],
  })
    .then((messages) => {
      console.log(messages);
      console.log(req.session.passport.user);
      // console.log(user);
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
          // console.log(user);
          //Sends a JSON response composed of the specified data. identical to res.send()
          res.json(message);
        })
        .catch((err) => {
          next(err);
        });
    });
  });
});

module.exports = router;
