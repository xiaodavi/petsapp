const express = require('express');
const User = require('../models/User');
const router  = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

//Signup //check naming user or users
router.get('/signup', (req, res) =>{
  console.log('blabla')
  res.render('auth/signup')
})

//login-GET
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// log in post
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    passReqToCallback: true,
  })
);

//signup post
router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 8) {
    res.render('auth/signup', {
      message: 'Your password is too short.'
    });
    return;
  }
  if (username === '') {
    res.render('auth/signup', { message: 'Username field cannot be empty' });
    return;
  }
  User.findOne({ username: username }).then(found => {
    if (found !== null) {
      res.render('auth/signup', { message: 'Username is already taken 🙊' });
    } else {
      // create a user with the username and password 
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      User.create({ username: username, password: hash })
        .then(dbUser => {
          // login with passport 
          req.login(dbUser, err => {
            if (err) {
              next(err);
            } else {
              res.redirect('/');
            }
          })
        })
        .catch(err => {
          next(err);
        });
    }
  });
});


// Google-login

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/register-pets",
    failureRedirect: "/" // here you would redirect to the login page using traditional login approach
  })
);


// router.get('/auth/logout', (req, res) => {
//   req.session.destroy(err => {
//     if(err) {
//       next(err)
//     } else {
//       res.redirect('/')
//     }
//   })
// });
 


//   // .then(users => {
//   //   console.log(users);
//   //   res.render('users/userList', {userList: users});
//   // })
//   // .catch(err => {
//   //   next(err);
//   // })


//      User.find()
//       .then(users => {
//         res.render('users/userProfile', {userProfile: foundUser, userList: users});
//    }).catch(err => console.log(err))
//    })
//    .catch(err => {
//      next(err);
//    })
// })
//
// // router.get('/users/:userId/like', (req, res, next) => {
// //   User.findById(req.params.userId)
// //   .then(foundUser => {
// //     console.log(foundUser);
// //     res.redirect('/users', {foundUser})
// //   })
// // })

// router.post('/users/:userId/like', (req, res, next) => {
//   // console.log(userId);
//   console.log(req.params.userId); // if click "like", will get the userId from each user
//   // User.findByIdAndUpdate({_id: userId}, {
    
//   // })
// })
//

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
  console.log('you logged out')
});

module.exports = router;
