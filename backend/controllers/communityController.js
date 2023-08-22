const Community = require("../models/Community");

// Create a new community
exports.createCommunity = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCommunity = new Community({
      name,
      description,
      createdBy: req.user.id, // Assuming authenticated user's ID is stored in req.user.id
    });

    await newCommunity.save();
    res.json(newCommunity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all communities
exports.getCommunities = async (req, res) => {
  try {
    const communities = await Community.find().populate("createdBy", "name");
    res.json(communities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a community by ID
exports.getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id).populate(
      "createdBy",
      "name"
    );
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

    // Check if the authenticated user is already a member
    if (community.members.includes(req.user.id)) {
      return res.status(400).json({ msg: "User is already a member" });
    }

    community.members.push(req.user.id);
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

// Leave a community
exports.leaveCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    // Check if the authenticated user is a member
    if (!community.members.includes(req.user.id)) {
      return res.status(400).json({ msg: "User is not a member" });
    }

    community.members = community.members.filter(
      (member) => member.toString() !== req.user.id
    );
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
