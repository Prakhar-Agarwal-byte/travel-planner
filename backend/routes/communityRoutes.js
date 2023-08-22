const express = require("express");
const router = express.Router();
const communityController = require("../controllers/communityController");
const passport = require("passport");

// Create a new community
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  communityController.createCommunity
);

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

// Accept a join request for a community
router.put(
  "/:id/accept-request/:userId",
  passport.authenticate("jwt", { session: false }),
  communityController.acceptJoinRequest
);

// Get members of a community
router.get("/:id/members", communityController.getCommunityMembers);

// Get trips of a community
router.get("/:id/trips", communityController.getCommunityTrips);

// Get communities joined by a user
router.get(
  "/user/:userId/joined",
  communityController.getUserJoinedCommunities
);

// Get communities created by a user
router.get(
  "/user/:userId/created",
  communityController.getUserCreatedCommunities
);

// Leave a community
router.delete(
  "/:id/leave",
  passport.authenticate("jwt", { session: false }),
  communityController.leaveCommunity
);

// Get communities by location
router.get("/location/:location", communityController.getCommunitiesByLocation);

module.exports = router;
