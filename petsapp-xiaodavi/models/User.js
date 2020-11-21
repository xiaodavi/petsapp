const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema (
  {
    username: String,
    password: String,
    pets: [String],
    likedPeople: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    googleID: String
  }, 
  
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
)



module.exports = model('User', userSchema);