const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const passport = require("passport");

// Create a new trip
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  tripController.createTrip
);

// Get all trips
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  tripController.getTrips
);

// Get a trip by ID
router.get("/:id", tripController.getTripById);

// Route to set trip status to completed
router.patch(
  "/:id/complete",
  passport.authenticate("jwt", { session: false }),
  tripController.completeTrip
);

// Update a trip
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  tripController.updateTrip
);

// Delete a trip
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  tripController.deleteTrip
);

// Join a trip
router.patch(
  "/:id/join-request",
  passport.authenticate("jwt", { session: false }),
  tripController.joinTrip
);

//Get members of a trip
router.get("/:id/members", tripController.getTripMembers);

//Get pending join requests of a trip
router.get("/:id/members", tripController.getPendingJoinRequests);

// Get trips of a user
// router.get(
//   "/user/:userId",
//   passport.authenticate("jwt", { session: false }),
//   tripController.getUserTrips
// );

// Remove user from a trip
router.delete(
  "/:id/leave",
  passport.authenticate("jwt", { session: false }),
  tripController.leaveTrip
);

// Remove user from a trip
router.delete(
  "/:id/remove/:userId",
  passport.authenticate("jwt", { session: false }),
  tripController.removeMember
);

// Accept a join request for a trip
router.patch(
  "/:id/accept-request/:userId",
  passport.authenticate("jwt", { session: false }),
  tripController.acceptJoinRequest
);

// Decline a join request for a trip
router.patch(
  "/:id/decline-request/:userId",
  passport.authenticate("jwt", { session: false }),
  tripController.declineJoinRequest
);

// Get pending join requests for a trip
// router.get(
//   "/:id/pending-requests",
//   passport.authenticate("jwt", { session: false }),
//   tripController.getPendingJoinRequests
// );

module.exports = router;
