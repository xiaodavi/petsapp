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

//
router.post("/register-pets", ensureAuthenticated, uploader.single('petsimage'), (req, res, next) => {
  // console.log('hahaah')
  const { petsname, breed } = req.body;
  const { _id } = req.user;
  // console.log(petsname)
  const petsimage = req.file.path;
  // console.log(req.session.passport.user);
  
  Pet.create({
    petsname,
    breed,
    petsimage,
    // owner: req.session.passport.user,
    owner: _id
  })
  .then(dbPet => {
    return User.findByIdAndUpdate(req.user._id, {$push: {pets: dbPet._id }})
  })
  .then(() => res.redirect('pets'))
  .catch(err => {
    next(err);
  })
})

// list all pets of the owner 
router.get('/pets', ensureAuthenticated, (req, res, next) => {
  // const {userId} = req.params.id
  const { _id } =req.user;
  Pet.find({owner: _id})
  .populate('owner')
  .then(myPets => {
    res.render('users/pets-details', {pets: myPets});
  })
  .catch(err => next(err));
})

router.get('/allPets', ensureAuthenticated, (req, res, next) => {
  Pet.find()
  .populate('owner')
  .then(allPets => {
    res.render('users/allPets', {allPets})
  })
  .catch(err => next(err))
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

//UPDATE /:id/edit

// router.post('/:id/delete', (req, res, next) => { //
//     Pet.findByIdAndRemove(req.params.id)
//         .then(() => {
//             res.redirect('register-pets');s
//         })
//         .catch(err => {
//             next(err);
//         })
// });

router.get('/users/:id/edit', (req, res, next) => {
    Pet.findByIdAndUpdate(req.params.id)
        .then(pet => {
            res.render('pets/edit', { pet });
        })
        .catch(err => {
            next(err);
        });
});

router.post('/users/:id', (req, res, next) =>{
 const {petsname, breed, petsimage} = req.body;
 console.log(req.params.id)
 Pet.findByIdAndUpdate(req.params.id, {petsname, breed, petsimage})
 .then(()=> {
   res.redirect("users/pets-details")
 })
})


router.post('/users/:id/delete', (req, res, next) => {
  Pet.findByIdAndRemove(req.params.id)
  .then(() => {
    res.redirect('users/:id');
  })
  .catch(err => {
    next(err);
  })
})

module.exports = router;
