const express = require('express');
const User = require('../models/User');
const router  = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

// Register pets page

router.get('/register-pets', (req, res, next) => {
  res.render('users/register-pets')
})

/* GET users page */
router.get('/users', (req, res, next) => {
  User.find()
  .then(users => {
    console.log(users);
    res.render('users/userList', {userList: users});
  })
  .catch(err => {
    next(err);
  })
});

router.get('/users/:userId', (req, res, next) => {
  User.findById(req.params.userId)
   .then(foundUser => {
     console.log(foundUser); 
     User.find()
      .then(users => {
        res.render('users/userProfile', {userProfile: foundUser, userList: users});
   }).catch(err => console.log(err))
   })
   .catch(err => {
     next(err);
   })
})

// router.get('/users/:userId/like', (req, res, next) => {
//   User.findById(req.params.userId)
//   .then(foundUser => {
//     console.log(foundUser);
//     res.redirect('/users', {foundUser})
//   })
// })

router.post('/users/:userId/like', (req, res, next) => {
  // console.log(userId);
  console.log(req.params.userId); // if click "like", will get the userId from each user
  // User.findByIdAndUpdate({_id: userId}, {
    
  // })
})

module.exports = router;