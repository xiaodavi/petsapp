const express = require("express");
const User = require("../models/User");
const Pet = require("../models/Pet");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { uploader, cloudinary } = require('../config/cloudinary');

// Register pets page

router.get("/register-pets", (req, res, next) => {
  console.log(req.session);
  User.findById(req.session.passport.user)
    .then((user) => {
      console.log(user);
      res.render("users/register-pets", { user: user });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/register-pets", uploader.single('petsimage'), (req, res, next) => {
  console.log('hahaah')
  const {petsname, breed} = req.body;
  console.log(petsname)
  const petsimage = req.file.path;
  console.log(req.session.passport.user);
  
  Pet.create({
    petsname,
    breed,
    petsimage,
    owner: req.session.passport.user
  })
  .then(pet =>{
    res.render("users/pets-details", {pet})
  }).catch(err => {
    next(err);
  })
})



/* GET users page */
// router.get("/users", (req, res, next) => {
//   User.find()
//     .then((users) => {
//       console.log(users);
//       res.render("users/userList", { userList: users });
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// router.get("/users/:userId", (req, res, next) => {
//   User.findById(req.params.userId)
//     .then((foundUser) => {
//       console.log(foundUser);
//       User.find()
//         .then((users) => {
//           res.render("users/userProfile", {
//             userProfile: foundUser,
//             userList: users,
//           });
//         })
//         .catch((err) => console.log(err));
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// // router.get('/users/:userId/like', (req, res, next) => {
// //   User.findById(req.params.userId)
// //   .then(foundUser => {
// //     console.log(foundUser);
// //     res.redirect('/users', {foundUser})
// //   })
// // })

// router.post("/users/:userId/like", (req, res, next) => {
//   // console.log(userId);
//   console.log(req.params.userId); // if click "like", will get the userId from each user
//   // User.findByIdAndUpdate({_id: userId}, {

//   // })
// });

module.exports = router;
