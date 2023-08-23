// Import required libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const passportConfig = require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const communityRoutes = require("./routes/communityRoutes");
const tripRoutes = require("./routes/tripRoutes");

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

// Initialize Passport.js
passportConfig(app);

// Use the routes
app.use("/auth", authRoutes); // Route paths will be prefixed with '/auth'
app.use("/users", userRoutes); // Route paths will be prefixed with '/users'
app.use("/communities", communityRoutes); // Route paths will be prefixed with '/communities'
app.use("/trips", tripRoutes); // Route paths will be prefixed with '/trips'

// Start the server
const PORT = process.env.PORT || 3000;
// Configure MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    // Start the server after MongoDB connection is established
    app.listen(PORT, () => {
      console.log(`Server is running on port 8000`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
