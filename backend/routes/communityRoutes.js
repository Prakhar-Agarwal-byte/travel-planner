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
  "/:id/join-request",
  passport.authenticate("jwt", { session: false }),
  communityController.joinCommunity
);

// Accept a join request for a community
router.put(
  "/:id/accept-request/:userId",
  passport.authenticate("jwt", { session: false }),
  communityController.acceptJoinRequest
);

// Decline a join request for a community
router.put(
  "/:id/decline-request/:userId",
  passport.authenticate("jwt", { session: false }),
  communityController.declineJoinRequest
);

//Get members of a community
router.get("/:id/members", communityController.getCommunityMembers);

//Get pending join requests of a community
router.get(
  "/:id/pendingJoinRequests",
  communityController.getPendingJoinRequests
);

// Get trips of a community
// router.get("/:id/trips", communityController.getCommunityTrips);

// Get communities joined by a user
router.get(
  "/user/:userId/joined",
  communityController.getUserJoinedCommunities
);

// Get communities created by a user
// router.get(
//   "/user/:userId/created",
//   communityController.getUserCreatedCommunities
// );

// Leave a community
router.delete(
  "/:id/leave",
  passport.authenticate("jwt", { session: false }),
  communityController.leaveCommunity
);

// Remove a member from community
router.delete(
  "/:id/remove/:userId",
  passport.authenticate("jwt", { session: false }),
  communityController.removeMember
);

// Delete a community and its associated trips
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  communityController.deleteCommunity
);

// Get communities by location
// router.get("/location/:location", communityController.getCommunitiesByLocation);

module.exports = router;
