const express = require("express");
const router = express.Router();
const communityController = require("../controllers/communityController");
const passport = require("passport");

// Get all communities
router.get("/", communityController.getCommunities);

// Get a community by ID
router.get("/:id", communityController.getCommunityById);

// Join a community
router.post(
  "/:id/join",
  passport.authenticate("jwt", { session: false }),
  communityController.joinCommunity
);

// Leave a community
router.post(
  "/:id/leave",
  passport.authenticate("jwt", { session: false }),
  communityController.leaveCommunity
);

module.exports = router;
