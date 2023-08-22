const Trip = require("../models/Trip");

// Create a new trip
exports.createTrip = async (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  try {
    const newTrip = new Trip({
      title,
      description,
      startDate,
      endDate,
      createdBy: req.user.id, // Assuming authenticated user's ID is stored in req.user.id
    });

    await newTrip.save();
    res.json(newTrip);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all trips
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate("createdBy", "name");
    res.json(trips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a trip by ID
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate(
      "createdBy",
      "name"
    );
    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }
    res.json(trip);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Trip not found" });
    }
    res.status(500).send("Server error");
  }
};

// Update a trip
exports.updateTrip = async (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  try {
    let trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    // Check if the authenticated user is the creator of the trip
    if (trip.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    trip.title = title;
    trip.description = description;
    trip.startDate = startDate;
    trip.endDate = endDate;

    await trip.save();

    res.json(trip);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Trip not found" });
    }
    res.status(500).send("Server error");
  }
};

// Delete a trip
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    // Check if the authenticated user is the creator of the trip
    if (trip.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await trip.remove();

    res.json({ msg: "Trip removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Trip not found" });
    }
    res.status(500).send("Server error");
  }
};
