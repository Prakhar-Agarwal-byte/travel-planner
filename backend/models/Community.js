const mongoose = require("mongoose");

// Define Community Schema
const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
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
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip", // Reference to the Trip model
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Community model
const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
