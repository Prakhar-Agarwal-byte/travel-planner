const mongoose = require("mongoose");
const validator = require("validator");

// Define User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "{VALUE} is not a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  profileImage: {
    type: String,
    required: true,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community", // Reference to the User model
      autopopulate: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(require("mongoose-autopopulate"));

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
