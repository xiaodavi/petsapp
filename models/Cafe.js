const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const cafeSchema = new Schema (
  {
    cafename: String,
    phone: Number,
    adress: String,
    city: String,
    country: String,
    postalCode: Number,
    coordinates:[]
  }, 
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
)


module.exports = model('Cafe', cafeSchema);

