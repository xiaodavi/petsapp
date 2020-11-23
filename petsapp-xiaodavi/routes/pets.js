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

router.get('/pets/:id/edit', (req, res, next) => {
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



// GET route for querying a specific movie from the database
// and pre-filling the edit form
 
// router.get('/movies/:id/edit', (req, res) => {
//   const { id } = req.params;
//   Movie.findById(id)
//     .then(movieToEdit => res.render('movie-edit', movieToEdit))
//     .catch(error => console.log(`Error while getting a single movie for edit: ${error}`));
// });

// // routes/movie.routes.js

// // ... all imports and routes stay untouched

// // POST route to save changes after updates in a specific movie

// router.post('/movies/:id/edit', fileUploader.single('image'), (req, res) => {
//   const { id } = req.params;
//   const { title, description } = req.body;

//   let imageUrl;
//   if (req.file) {
//     imageUrl = req.file.path;
//   } else {
//     imageUrl = req.body.existingImage;
//   }

//   Movie.findByIdAndUpdate(id, { title, description, imageUrl }, { new: true })
//     .then(() => res.redirect(`/movies`))
//     .catch(error => console.log(`Error while updating a single movie: ${error}`));
// });



router.post('/pets/:id/delete', (req, res, next) => {
  const petsId = req.params.id
  Pet.findByIdAndRemove(petsId)
  .then(() => {
    res.redirect('/pets');
  })
  .catch(err => {
    next(err);
  })
})

module.exports = router;
