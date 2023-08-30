const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

// Register a new user
exports.registerUser = async (req, res) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const profileImage = `https://www.gravatar.com/avatar/${md5(
      email
    )}?s=200&d=identicon`; // Change 's' parameter to set avatar size

    // Create a new user
    user = new User({
      name,
      email,
      password,
      profileImage,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Generate JWTs
    // const accessTokenPayload = { user: { id: user.id } };
    // const refreshTokenPayload = { user: { id: user.id, refresh: true } };

    // const accessToken = jwt.sign(accessTokenPayload, process.env.JWT_SECRET, {
    //   expiresIn: 3600,
    // });

    // const refreshToken = jwt.sign(
    //   refreshTokenPayload,
    //   process.env.JWT_REFRESH_SECRET,
    //   { expiresIn: 86400 * 30 } // Adjust as needed
    // );

    // res.json({ accessToken, refreshToken });

    // Remove password from user object before sending
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    // You can also delete other sensitive properties if needed
    // delete userWithoutPassword.sensitiveProperty;

    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWTs
    const accessTokenPayload = { user: { id: user.id } };
    const refreshTokenPayload = { user: { id: user.id, refresh: true } };

    const accessToken = jwt.sign(accessTokenPayload, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    const refreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: 86400 * 30 } // Adjust as needed
    );

    // Create a user object without the password field
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    res.json({ user: userWithoutPassword, accessToken, refreshToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Refresh token
exports.refreshToken = async (req, res) => {
  const { refresh } = req.body;

  if (!refresh) {
    return res.status(401).json({ msg: "No refresh token provided" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);

    // Check if the token is valid and has the refresh flag
    if (!decoded.user || !decoded.user.refresh) {
      return res.status(401).json({ msg: "Invalid refresh token" });
    }

    // Find the user by ID
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Generate a new access token
    const accessTokenPayload = { user: { id: user.id } };
    const accessToken = jwt.sign(accessTokenPayload, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    // Create a user object without the password field
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    res.json({ user: userWithoutPassword, accessToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
