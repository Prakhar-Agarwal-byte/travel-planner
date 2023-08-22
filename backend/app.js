// Import required libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const passportConfig = require("./config/passport");

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

// Configure MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    // Start the server after MongoDB connection is established
    app.listen(8000, () => {
      console.log(`Server is running on port 8000`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Initialize Passport.js
passportConfig(app);

// Use the routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const communityRoutes = require('./routes/communityRoutes');
const tripRoutes = require('./routes/tripRoutes');

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/communities", communityRoutes);
app.use("/trips", tripRoutes);

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

