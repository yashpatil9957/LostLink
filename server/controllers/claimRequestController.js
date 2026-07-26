import mongoose from "mongoose";
import ClaimRequest from "../models/ClaimRequest.js";
import LostItem from "../models/LostItem.js";
import FoundItem from "../models/FoundItem.js";

export const createClaimRequest = async (req, res) => {
  try {
    const { lostItem, foundItem, message } = req.body;

    // Validate required fields
    if (!lostItem || !foundItem || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Validate ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(lostItem) ||
      !mongoose.Types.ObjectId.isValid(foundItem)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID",
      });
    }

    // Check if lost item exists
    const lost = await LostItem.findById(lostItem);

    if (!lost) {
      return res.status(404).json({
        success: false,
        message: "Lost item not found",
      });
    }

    // Ensure logged-in user owns the lost item
    if (lost.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only claim your own lost item",
      });
    }

    // Check if found item exists
    const found = await FoundItem.findById(foundItem);

    if (!found) {
      return res.status(404).json({
        success: false,
        message: "Found item not found",
      });
    }

    // Ensure both items belong to the same category
    if (lost.category !== found.category) {
      return res.status(400).json({
        success: false,
        message: "Lost and found items must belong to the same category",
      });
    }

    // Prevent duplicate claim requests
    const existingClaim = await ClaimRequest.findOne({
      claimant: req.user._id,
      lostItem,
      foundItem,
    });

    if (existingClaim) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a claim request for this item",
      });
    }

    // Create claim request
    const claimRequest = await ClaimRequest.create({
      claimant: req.user._id,
      lostItem,
      foundItem,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Claim request created successfully",
      claimRequest,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getClaimRequests = async (req, res) => {
  try {
    const { type } = req.query;

    if (type === "sent") {
    const claims = await ClaimRequest.find({
        claimant: req.user._id,
    })
        .populate("lostItem", "title category image")
        .populate("foundItem", "title category image");

    return res.status(200).json({
        success: true,
        count: claims.length,
        claims,
    });
    }    

    if (type === "received") {
    const myFoundItems = await FoundItem.find({
        foundBy: req.user._id,
    }).select("_id");

    const foundItemIds = myFoundItems.map(
        (item) => item._id
    );

    const claims = await ClaimRequest.find({
        foundItem: {
        $in: foundItemIds,
        },
    })
        .populate("claimant", "name email")
        .populate("lostItem", "title category image")
        .populate("foundItem", "title category image");

    return res.status(200).json({
        success: true,
        count: claims.length,
        claims,
    });
    }

    return res.status(400).json({
    success: false,
    message: "Invalid claim type",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const rejectClaimRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid claim request ID",
      });
    }

    const claim = await ClaimRequest.findById(id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim request not found",
      });
    }

    if (claim.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Claim request has already been processed",
      });
    }

    const foundItem = await FoundItem.findById(claim.foundItem);

    if (!foundItem) {
      return res.status(404).json({
        success: false,
        message: "Found item not found",
      });
    }

    if (
      foundItem.foundBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    claim.status = "Rejected";
    await claim.save();

    return res.status(200).json({
      success: true,
      message: "Claim request rejected successfully",
      claim,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const approveClaimRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid claim request ID",
      });
    }

    // Find claim request
    const claim = await ClaimRequest.findById(id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim request not found",
      });
    }

    // Prevent processing an already processed claim
    if (claim.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Claim request has already been processed",
      });
    }

    // Find related found item
    const foundItem = await FoundItem.findById(claim.foundItem);

    if (!foundItem) {
      return res.status(404).json({
        success: false,
        message: "Found item not found",
      });
    }

    // Only the finder can approve
    if (foundItem.foundBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Approve current claim
    claim.status = "Approved";
    await claim.save();

    // Reject all other pending claims for this found item
    await ClaimRequest.updateMany(
      {
        foundItem: claim.foundItem,
        _id: { $ne: claim._id },
        status: "Pending",
      },
      {
        $set: {
          status: "Rejected",
        },
      }
    );

    // Update Lost Item status
    const lostItem = await LostItem.findById(claim.lostItem);

    if (!lostItem) {
      return res.status(404).json({
        success: false,
        message: "Lost item not found",
      });
    }

    lostItem.status = "Claimed";
    await lostItem.save();

    // Update Found Item status
    foundItem.status = "Claimed";
    await foundItem.save();

    return res.status(200).json({
      success: true,
      message: "Claim request approved successfully",
      claim,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};