const mongoose = require('mongoose');
const User = require('../models/User.model');

const DB_NAME = 'pets-app';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const users = [
  {
    username: 'mary',
    pets: [],
    likedPeople: [],
  }, 

  {
    username: 'tom',
    pets: [],
    likedPeople: [],
  }, 

  {
    username: 'antonie',
    pets: [],
    likedPeople: [],
  }, 

  {
    username: 'john',
    pets: [],
    likedPeople: [],
  }, 

  {
    username: 'jan',
    pets: [],
    likedPeople: [],
  }, 

  {
    username: 'katie',
    pets: [],
    likedPeople: [],
  },

  {
    username: 'timmy',
    pets: [],
    likedPeople: [],
  },

  {
    username: 'kaki',
    pets: [],
    likedPeople: [],
  },

]


User.create(users)
  .then(usersFromDB => {
      console.log(`Created ${usersFromDB.length} users`);
            mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while inserting users: ${err}`));