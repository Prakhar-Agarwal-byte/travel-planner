const Trip = require("../models/Trip");
const Community = require("../models/Community");

exports.createTrip = async (req, res) => {
  const {
    title,
    description,
    modeOfTransport,
    fromDestination,
    toDestination,
    startDate,
    capacity,
    communityId,
  } = req.body;

  try {
    // Create a new trip
    const newTrip = new Trip({
      title,
      description,
      modeOfTransport,
      fromDestination,
      toDestination,
      startDate,
      capacity,
      createdBy: req.user.id,
      community: communityId,
      pendingJoinRequests: [],
      members: [req.user.id],
    });

    await newTrip.save();

    // Add the new trip's ID to the community's trips array
    await Community.findByIdAndUpdate(
      communityId,
      { $push: { trips: newTrip._id } }, // Add the new trip's ID to the trips array
      { new: true }
    );

    res.json(newTrip);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all trips
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a trip by ID
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
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
// exports.updateTrip = async (req, res) => {
//   const { title, description, startDate, endDate } = req.body;

//   try {
//     let trip = await Trip.findById(req.params.id);

//     if (!trip) {
//       return res.status(404).json({ msg: "Trip not found" });
//     }

//     // Check if the authenticated user is the creator of the trip
//     if (trip.createdBy.toString() !== req.user.id) {
//       return res.status(401).json({ msg: "Not authorized" });
//     }

//     trip.title = title;
//     trip.description = description;
//     trip.startDate = startDate;
//     trip.endDate = endDate;

//     await trip.save();

//     res.json(trip);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Trip not found" });
//     }
//     res.status(500).send("Server error");
//   }
// };

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

    const community = await Community.findOne({ trips: req.params.id });

    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    // Remove the trip reference from the trips array
    community.trips = community.trips.filter(
      (tripId) => tripId.toString() !== req.params.id
    );

    await community.save();

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

// Send a join request to a trip
exports.joinTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    // Check if the authenticated user is a member of the community associated with the trip
    const community = await Community.findById(trip.community);
    if (
      !community ||
      !community.members.some(
        (member) => member.user.toString() === req.user.id
      )
    ) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Check if the user has already sent a join request or is already a member
    if (
      trip.pendingJoinRequests.some(
        (request) => request.user.toString() === req.user.id
      ) ||
      trip.members.some((member) => member.user.toString() === req.user.id)
    ) {
      return res
        .status(400)
        .json({ msg: "User has already sent a request or is a member" });
    }

    trip.pendingJoinRequests.push({ user: req.user.id });
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

// Accept a user's join request for a trip
exports.acceptJoinRequest = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    // Check if the authenticated user is the creator of the trip
    if (trip.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Find the user in pendingJoinRequests
    const pendingUserIndex = trip.pendingJoinRequests.findIndex(
      (request) => request.user.toString() === req.params.userId
    );

    if (pendingUserIndex === -1) {
      return res.status(400).json({ msg: "User request not found" });
    }

    const pendingUser = trip.pendingJoinRequests[pendingUserIndex];
    trip.pendingJoinRequests.splice(pendingUserIndex, 1);

    // Move the user from pendingJoinRequests to members
    trip.members.push({ user: pendingUser.user });
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

// Decline a user's join request for a trip
exports.declineJoinRequest = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    // Check if the authenticated user is the creator of the trip
    if (trip.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Find the user in pendingJoinRequests
    const pendingUserIndex = trip.pendingJoinRequests.findIndex(
      (request) => request.user.toString() === req.params.userId
    );

    if (pendingUserIndex === -1) {
      return res.status(400).json({ msg: "User request not found" });
    }

    // Remove the user from pendingJoinRequests
    trip.pendingJoinRequests.splice(pendingUserIndex, 1);
    await trip.save();

    res.json({ msg: "Join request declined" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Trip not found" });
    }
    res.status(500).send("Server error");
  }
};

// Get pending join requests for a trip
// exports.getPendingJoinRequests = async (req, res) => {
//   try {
//     const trip = await Trip.findById(req.params.id).populate(
//       "pendingJoinRequests",
//       "name"
//     );

//     if (!trip) {
//       return res.status(404).json({ msg: "Trip not found" });
//     }

//     res.json(trip.pendingJoinRequests);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Trip not found" });
//     }
//     res.status(500).send("Server error");
//   }
// };

// Get members of a trip
// exports.getTripMembers = async (req, res) => {
//   try {
//     const trip = await Trip.findById(req.params.id).populate("members", "name");

//     if (!trip) {
//       return res.status(404).json({ msg: "Trip not found" });
//     }

//     res.json(trip.members);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Trip not found" });
//     }
//     res.status(500).send("Server error");
//   }
// };

// Get trips of a user
// exports.getUserTrips = async (req, res) => {
//   try {
//     const trips = await Trip.find({ createdBy: req.user.id })
//       .populate("community", "name")
//       .populate("members", "name");
//     res.json(trips);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// Remove a user from a trip
exports.leaveTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    // Check if the authenticated user is a member of the trip
    const memberIndex = trip.members.findIndex(
      (member) => member.user.toString() === req.user.id
    );
    if (memberIndex === -1) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    trip.members.splice(memberIndex, 1);
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

// Get trips of a community
// exports.getCommunityTrips = async (req, res) => {
//   try {
//     const community = await Community.findById(req.params.id);

//     if (!community) {
//       return res.status(404).json({ msg: "Community not found" });
//     }

//     const trips = await Trip.find({ community: community.id })
//       .populate("members", "name")
//       .populate("pendingJoinRequests", "name")
//       .populate("createdBy", "name");

//     res.json(trips);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Community not found" });
//     }
//     res.status(500).send("Server error");
//   }
// };

// Remove a user's pending join request for a trip
exports.cancelJoinRequest = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    // Check if the user has a pending join request
    const requestIndex = trip.pendingJoinRequests.findIndex(
      (request) => request.user.toString() === req.user.id
    );
    if (requestIndex === -1) {
      return res.status(400).json({ msg: "No pending join request found" });
    }

    trip.pendingJoinRequests.splice(requestIndex, 1);
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
