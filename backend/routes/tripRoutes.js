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
router.get("/", tripController.getTrips);

// Get a trip by ID
router.get("/:id", tripController.getTripById);

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
router.post(
  "/:id/join",
  passport.authenticate("jwt", { session: false }),
  tripController.joinTrip
);

// Get members of a trip
router.get("/:id/members", tripController.getTripMembers);

// Get trips of a user
router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  tripController.getUserTrips
);

// Remove user from a trip
router.delete(
  "/:id/leave",
  passport.authenticate("jwt", { session: false }),
  tripController.leaveTrip
);

// Send a join request to a trip
router.post(
  "/:id/join-request",
  passport.authenticate("jwt", { session: false }),
  tripController.joinTrip
);

// Accept a join request for a trip
router.put(
  "/:id/accept-request/:userId",
  passport.authenticate("jwt", { session: false }),
  tripController.acceptJoinRequest
);

// Get pending join requests for a trip
router.get(
  "/:id/pending-requests",
  passport.authenticate("jwt", { session: false }),
  tripController.getPendingJoinRequests
);

module.exports = router;