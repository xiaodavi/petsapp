const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema (
  {
    username: String,
    password: String,
    pets: [{
      type: Schema.Types.ObjectId,
      ref: 'Pet'
    }],

    likedPeople: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    googleID: String,
    // role: {
    //   type: String,
    //   enum: ['admin', 'user']
    // }
  }, 
  
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
)



module.exports = model('User', userSchema);