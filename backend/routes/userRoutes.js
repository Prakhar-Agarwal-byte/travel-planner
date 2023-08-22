const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

// Get user profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.getProfile
);

// Update user profile
router.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.updateProfile
);

// Change user password
router.put(
  "/change-password",
  passport.authenticate("jwt", { session: false }),
  userController.changePassword
);

module.exports = router;
