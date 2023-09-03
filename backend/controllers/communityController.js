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
      members: [req.user.id], // Add the user to the members list
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
    const communities = await Community.find();
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
      .populate("members", "name email profileImage")
      .populate("pendingJoinRequests", "name email profileImage")
      .populate(
        "trips",
        "title modeOfTransport fromDestination toDestination startDate"
      )
      .populate("createdBy", "name");

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
      community.members.some((member) => {
        return member.toString() === req.user.id;
      }) ||
      community.pendingJoinRequests.some((request) => {
        return request.toString() === req.user.id;
      })
    ) {
      return res
        .status(400)
        .json({ msg: "User is already a member or has a pending request" });
    }

    community.pendingJoinRequests.push(req.user.id);
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

    // Find the user in pendingJoinRequests
    const pendingUserIndex = community.pendingJoinRequests.findIndex(
      (request) => {
        return request.toString() === req.params.userId;
      }
    );

    if (pendingUserIndex === -1) {
      return res.status(400).json({ msg: "User request not found" });
    }

    const pendingUser = community.pendingJoinRequests[pendingUserIndex];
    community.pendingJoinRequests.splice(pendingUserIndex, 1);

    // Move the user from pendingJoinRequests to members
    community.members.push(pendingUser);
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

// Decline a user's request to join a community
exports.declineJoinRequest = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    // Check if the authenticated user is the creator of the community
    if (community.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Find the user in pendingJoinRequests
    const pendingUserIndex = community.pendingJoinRequests.findIndex(
      (request) => request.toString() === req.params.userId
    );

    if (pendingUserIndex === -1) {
      return res.status(400).json({ msg: "User request not found" });
    }

    // Remove the user from pendingJoinRequests
    community.pendingJoinRequests.splice(pendingUserIndex, 1);
    await community.save();

    res.json({ msg: "Join request declined" });
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
      "members",
      "name email profileImage"
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

// Get pending join requests of a community
exports.getPendingJoinRequests = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id).populate(
      "pendingJoinRequests",
      "name email profileImage"
    );

    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    res.json(community.pendingJoinRequests);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Community not found" });
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
//       .populate("community", "name")
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

// Get communities joined by a user
exports.getUserJoinedCommunities = async (req, res) => {
  try {
    const userId = req.params.userId;
    const communities = await Community.find({
      members: { $in: [userId] },
    });
    res.json(communities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get communities created by a user
// exports.getUserCreatedCommunities = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const communities = await Community.find({ createdBy: userId })
//       .populate("members", "name")
//       .populate("createdBy", "name");

//     res.json(communities);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// Remove a user from a community
exports.leaveCommunity = async (req, res) => {
  try {
    const communityId = req.params.id;
    const userId = req.user.id;
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    // Check if the authenticated user is the creator of the community
    if (community.createdBy.toString() === userId) {
      return res
        .status(401)
        .json({ msg: "You cannot leave a community you created" });
    }

    // Check if the authenticated user is a member of the community
    const memberIndex = community.members.findIndex(
      (member) => member.toString() === userId
    );
    if (memberIndex === -1) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Remove the user from all trips where they are a member
    await Trip.updateMany(
      { community: communityId, members: userId },
      { $pull: { members: userId } }
    );

    // Remove the user from all trips where they have a pending request
    await Trip.updateMany(
      { community: communityId, pendingJoinRequests: userId },
      { $pull: { pendingJoinRequests: userId } }
    );

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

// Remove a member from a community
exports.removeMember = async (req, res) => {
  try {
    const communityId = req.params.id;
    const userId = req.params.userId;

    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    // Check if the authenticated user is the creator of the community
    if (community.createdBy.toString() === userId) {
      return res
        .status(401)
        .json({ msg: "You cannot leave a community you created" });
    }

    // Check if the user is a member of the community
    const memberIndex = community.members.findIndex(
      (member) => member.toString() === userId
    );
    if (memberIndex === -1) {
      return res.status(401).json({ msg: "Not a member" });
    }

    // Remove the user from all trips where they are a member
    await Trip.updateMany(
      { community: communityId, members: userId },
      { $pull: { members: userId } }
    );

    // Remove the user from all trips where they have a pending request
    await Trip.updateMany(
      { community: communityId, pendingJoinRequests: userId },
      { $pull: { pendingJoinRequests: userId } }
    );

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

// Delete a community and its associated trips
exports.deleteCommunity = async (req, res) => {
  try {
    // Find the community by ID
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    // Check if the authenticated user is the creator of the community
    if (community.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Find and delete all trips associated with the community
    await Trip.deleteMany({ community: community._id });

    // Delete the community
    await community.deleteOne();

    res.json({ msg: "Community and associated trips removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Community not found" });
    }
    res.status(500).send("Server error");
  }
};

// Get communities by location
// exports.getCommunitiesByLocation = async (req, res) => {
//   const { location } = req.params;

//   try {
//     const communities = await Community.find({ location })
//       .populate("members", "name")
//       .populate("createdBy", "name");

//     res.json(communities);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };
