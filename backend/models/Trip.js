const mongoose = require("mongoose");

// Define Trip Schema
const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  modeOfTransport: {
    type: String,
    enum: ["car", "train", "bus", "ferry", "bike", "flight"],
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  fromDestination: {
    type: String,
    required: true,
  },
  toDestination: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
    autopopulate: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community", // Reference to the Community model
    required: true,
    autopopulate: true,
  },
  pendingJoinRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      autopopulate: true,
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      autopopulate: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

tripSchema.plugin(require("mongoose-autopopulate"));

// Create Trip model
const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
