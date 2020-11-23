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

router.get("/register-pets", ensureAuthenticated, (req, res, next) => {
 // console.log(req.session);
  User.findById(req.session.passport.user)
    .then((user) => {
      // console.log(user);
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

router.get('/pets/:petsId', ensureAuthenticated, (req, res, next) => {
  const petsId = req.params.petsId
  Pet.findById(petsId)
  .populate('owner')
  .then(pet => {
    res.render()
  })
})

router.get('/pets/:id/edit', ensureAuthenticated, (req, res, next) => {
     Pet.findById(req.params.id)
        .then(pet => {
          console.log(pet)
            res.render('pets/edit', { pet });
        })
        .catch(err => {
            next(err);
        });
});

router.post('/pets/:id/edit', ensureAuthenticated, uploader.single('petsimage'), (req, res, next) =>{
  const { petsname, breed } = req.body;
  const { id } = req.params;
  // console.log(petsname)
  let petsimage;
  if (req.file) {
    petsimage = req.file.path;
  } else {
    petsimage = req.body.existingImage;
  }
  Pet.findByIdAndUpdate(id, {
    petsname,
    breed,
    petsimage,
    owner: req.user._id
  }, { new: true })
  .then(()=> {
    res.redirect("/pets")
  }).catch(err => {
    next(err);
  })
})

router.post('/pets/:id/delete', ensureAuthenticated, (req, res, next) => {
  const petsId = req.params.id
  Pet.findByIdAndRemove(petsId)
  .then(() => {
    res.redirect('/pets');
  })
  .catch(err => {
    next(err);
  })
})

router.get('/movie/delete/:id', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(movie => {
      if (movie.imgPath) {
        cloudinary.uploader.destroy(movie.publicId);
      }
      res.redirect('/');
    })
    .catch(err => {
      next(err);
    })
});


module.exports = router;
