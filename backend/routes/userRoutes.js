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

module.exports = router;
