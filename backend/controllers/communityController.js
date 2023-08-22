const Community = require("../models/Community");
const User = require("../models/User");
const Trip = require("../models/Trip");
const { validationResult } = require("express-validator");

// Create a new community
exports.createCommunity = async (req, res) => {
  const { name, description, location } = req.body;

  try {
    const community = new Community({
      name,
      description,
      location,
      createdBy: req.user.id,
    });

    await community.save();

    res.json(community);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all communities
exports.getCommunities = async (req, res) => {
  try {
    const communities = await Community.find()
      .populate("members.user", "name")
      .populate("pendingJoiningRequests.user", "name")
      .populate("trips", "title");
    res.json(communities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a community by ID
exports.getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)
      .populate("members.user", "name")
      .populate("pendingJoiningRequests.user", "name")
      .populate("trips", "title");
    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }
    res.json(community);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Community not found" });
    }
    res.status(500).send("Server error");
  }
};

// Join a community
exports.joinCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    // Check if the authenticated user is already a member or has a pending request
    if (
      community.members.some(
        (member) => member.user.toString() === req.user.id
      ) ||
      community.pendingJoiningRequests.some(
        (request) => request.user.toString() === req.user.id
      )
    ) {
      return res
        .status(400)
        .json({ msg: "User is already a member or has a pending request" });
    }

    community.pendingJoiningRequests.push({ user: req.user.id });
    await community.save();

    res.json(community);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Community not found" });
    }
    res.status(500).send("Server error");
  }
};

// Accept a user's request to join a community
exports.acceptJoinRequest = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    // Check if the authenticated user is the creator of the community
    if (community.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Find the user in pendingJoiningRequests
    const pendingUserIndex = community.pendingJoiningRequests.findIndex(
      (request) => request.user.toString() === req.params.userId
    );

    if (pendingUserIndex === -1) {
      return res.status(400).json({ msg: "User request not found" });
    }

    const pendingUser = community.pendingJoiningRequests[pendingUserIndex];
    community.pendingJoiningRequests.splice(pendingUserIndex, 1);

    // Move the user from pendingJoiningRequests to members
    community.members.push({ user: pendingUser.user });
    await community.save();

    res.json(community);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Community not found" });
    }
    res.status(500).send("Server error");
  }
};

// Get members of a community
exports.getCommunityMembers = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id).populate(
      "members.user",
      "name"
    );

    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    res.json(community.members);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Community not found" });
    }
    res.status(500).send("Server error");
  }
};

// Get trips of a community
exports.getCommunityTrips = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    const trips = await Trip.find({ community: community.id })
      .populate("members.user", "name")
      .populate("community", "name")
      .populate("createdBy", "name");

    res.json(trips);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Community not found" });
    }
    res.status(500).send("Server error");
  }
};

// Get communities joined by a user
exports.getUserJoinedCommunities = async (req, res) => {
  try {
    const communities = await Community.find({ "members.user": req.user.id })
      .populate("members.user", "name")
      .populate("createdBy", "name");

    res.json(communities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get communities created by a user
exports.getUserCreatedCommunities = async (req, res) => {
  try {
    const communities = await Community.find({ createdBy: req.user.id })
      .populate("members.user", "name")
      .populate("createdBy", "name");

    res.json(communities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Remove a user from a community
exports.leaveCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    // Check if the authenticated user is a member of the community
    const memberIndex = community.members.findIndex(
      (member) => member.user.toString() === req.user.id
    );
    if (memberIndex === -1) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    community.members.splice(memberIndex, 1);
    await community.save();

    res.json(community);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Community not found" });
    }
    res.status(500).send("Server error");
  }
};

// Get communities by location
exports.getCommunitiesByLocation = async (req, res) => {
  const { location } = req.params;

  try {
    const communities = await Community.find({ location })
      .populate("members.user", "name")
      .populate("createdBy", "name");

    res.json(communities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};