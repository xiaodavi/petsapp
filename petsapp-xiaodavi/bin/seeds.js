const mongoose = require('mongoose');
const Pet = require('../models/Pet');
const User = require('../models/User');

const DB_NAME = 'pets-app';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const users = [
  {
    username: 'mary',
    password: '123456789',
    pets: [
    {
      petsname: "antonie",
      breed: "icebear",
      petsimage: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    },
    {
      petsname: "coffee",
      breed: "dog",
      petsimage: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    },
  ],
    likedPeople: [],
  }, 

  {
    username: 'tom',
    password: '123456789',
    pets: [{
      petsname: "red panda",
      breed: "panda",
      petsimage: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    }],
    likedPeople: [],
  }, 

  {
    username: 'antonie',
    password: '123456789',
    pets: [{
      petsname: "sanwich",
      breed: "dog",
      petsimage: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    }],
    likedPeople: [],
  }, 

  {
    username: 'john',
    password: '123456789',
    pets: [{
      petsname: "chocolate",
      breed: "dog",
      petsimage: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    }],
    likedPeople: [],
  }, 

  {
    username: 'jan',
    password: '123456789',
    pets: [{
      petsname: "xiaolu",
      breed: "dear",
      petsimage: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    }],
    likedPeople: [],
  }, 

  {
    username: 'katie',
    password: '123456789',
    pets: [{
      petsname: "katie",
      breed: "cat",
      petsimage: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    }],
    likedPeople: [],
  },

  {
    username: 'timmy',
    password: '123456789',
    pets: [{
      petsname: "panda",
      breed: "panda",
      petsimage: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    }],
    likedPeople: [],
  },

  {
    username: 'kaki',
    password: '123456789',
    pets: [{
      petsname: "cat",
      breed: "cat",
      petsimage: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    }],
    likedPeople: [],
  },

]

// users.forEach(user => {
//   user.pets.forEach(pet => {
//     Pet.create(pet).then(dbPet => {
//       user.pet = dbPet._id;
//       console.log(pet);
//     }).then(() => {
//       console.log(user);
//       User.create(user);
//     })
//   })
// })

async function petLoop(pet) {
  return new Promise(
    (resolve, reject) => {
      Pet.create(pet).then(dbPet => {
        resolve(dbPet._id);
      })
    }
  )
}

users.forEach(async user => {
  for (let i = 0; i < user.pets.length; i++) {
    user.pets[i] = await petLoop(user.pets[i]);
  }
  console.log(user);
  await User.create(user);
})



// User.create(users)
//   .then(usersFromDB => {
//       console.log(`Created ${usersFromDB.length} users`);
//             mongoose.connection.close();
//   })
//   .catch(err => console.log(`An error occurred while inserting users: ${err}`));