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
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
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
  fromCoordinates: [{ type: Number }],
  toCoordinates: [{ type: Number }],
  startDate: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community", // Reference to the Community model
    required: true,
  },
  pendingJoinRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  ],
  flightPriceData: {},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Trip model
const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
