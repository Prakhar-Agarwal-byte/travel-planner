const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const passport = require("passport");

// Get all trips
router.get("/", tripController.getTrips);

// Get a trip by ID
router.get("/:id", tripController.getTripById);

// Create a new trip
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  tripController.createTrip
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

module.exports = router;
