const express = require("express");
const User = require("../models/User");
const Pet = require("../models/Pet");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { uploader, cloudinary } = require("../config/cloudinary");
const { populate } = require("../models/User");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.render("/login");
  }
}

router.get("/register-pets", ensureAuthenticated, (req, res, next) => {
  User.findById(req.session.passport.user)
    .then((user) => {
      res.render("users/register-pets", { user: user });
    })
    .catch((err) => {
      next(err);
    });
});

router.post(
  "/register-pets",
  ensureAuthenticated,
  uploader.single("petsimage"),
  (req, res, next) => {
    const { petsname, breed } = req.body;
    const { _id } = req.user;
    const petsimage = req.file.path;
    const publicId = req.file.filename;
    console.log(req.file);
    Pet.create({
      petsname,
      breed,
      petsimage,
      owner: _id,
      publicId,
    })
      .then((dbPet) => {
        return User.findByIdAndUpdate(req.user._id, {
          $push: { pets: dbPet._id },
        });
      })
      .then(() => res.redirect("pets"))
      .catch((err) => {
        next(err);
      });
  }
);

router.get("/pets", ensureAuthenticated, (req, res, next) => {
  const { _id } = req.user;
  Pet.find({ owner: _id })
    .populate("owner")
    .then((myPets) => {
      res.render("users/pets-details", { pets: myPets });
    })
    .catch((err) => next(err));
});

router.get("/allPets", ensureAuthenticated, (req, res, next) => {
  Pet.aggregate([{ $sample: { size: 1 } }])
    .then((randomPet) => {
      res.render("users/allPets", { allPets: randomPet });
    })
    .catch((err) => next(err));
});

router.get("/pets/:petsId", ensureAuthenticated, (req, res, next) => {
  const petsId = req.params.petsId;
  Pet.findById(petsId)
    .populate("owner")
    .then((pet) => {
      res.render();
    });
});

router.get("/pets/:id/edit", ensureAuthenticated, (req, res, next) => {
  Pet.findById(req.params.id)
    .then((pet) => {
      console.log(pet);
      res.render("pets/edit", { pet });
    })
    .catch((err) => {
      next(err);
    });
});

router.post(
  "/pets/:id/edit",
  ensureAuthenticated,
  uploader.single("petsimage"),
  (req, res, next) => {
    const { petsname, breed } = req.body;
    const { id } = req.params;
    let petsimage;
    if (req.file) {
      petsimage = req.file.path;
    } else {
      petsimage = req.body.existingImage;
    }
    Pet.findByIdAndUpdate(
      id,
      {
        petsname,
        breed,
        petsimage,
        owner: req.user._id,
      },
      { new: true }
    )
      .then(() => {
        res.redirect("/pets");
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.get("/pets/:id/edit", (req, res, next) => {
  Pet.findById(req.params.id)
    .then((pet) => {
      console.log(pet);
      res.render("pets/edit", { pet });
    })
    .catch((err) => {
      next(err);
    });
});

router.post(
  "/pets/:id/edit",
  ensureAuthenticated,
  uploader.single("petsimage"),
  (req, res, next) => {
    const { petsname, breed } = req.body;
    const { id } = req.params;
    let petsimage;
    if (req.file) {
      petsimage = req.file.path;
    } else {
      petsimage = req.body.existingImage;
    }
    Pet.findByIdAndUpdate(
      id,
      {
        petsname,
        breed,
        petsimage,
        owner: req.user._id,
      },
      { new: true }
    )
      .then(() => {
        res.redirect("/pets");
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.post("/pets/:id/delete", ensureAuthenticated, (req, res, next) => {
  Pet.findByIdAndDelete(req.params.id)
    .then((pet) => {
      console.log(pet);
      if (pet.petsimage) {
        cloudinary.uploader.destroy(pet.publicId);
      }
      res.redirect("/pets");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/pets/like", (req, res, next) => {
  res.redirect("/pets/like", 
  { message: req.flash("You liked this pet 💛") });
});

router.post("/pets/like", ensureAuthenticated, (req, res, next) => {
  const likedPersonId = req.body.id;
  const loggedInUserId = req.user._id;

  User.findByIdAndUpdate(loggedInUserId, {
    $push: { likedPeople: likedPersonId },
  })
    .then((loggedInUserfromDB) => {
      User.findById(likedPersonId).then((likedPersonfromDB) => {
        if (likedPersonfromDB.likedPeople.includes(loggedInUserId)) {
          res.render("match/matchPage", { likedPersonfromDB, loggedInUserId });
        } else {
          res.redirect("/allPets");
        }
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movie/delete/:id", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((movie) => {
      if (movie.imgPath) {
        cloudinary.uploader.destroy(movie.publicId);
      }
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
