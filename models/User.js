const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    userImg: String,
    email: String,
    address: {
      city: String,
      state: String,
      zip: Number,
    },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
    likedPeople: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    googleID: String,
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("User", userSchema);
