import mongoose from "mongoose";
import Claim from "../models/Claim.js";
import FoundItem from "../models/FoundItem.js";

// Create a claim
export const createClaim = async (req, res) => {
  try {
    const { foundItemId } = req.body;

    // Validate item ID
    if (!mongoose.Types.ObjectId.isValid(foundItemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid found item ID",
      });
    }

    // Find found item
    const foundItem = await FoundItem.findById(foundItemId);

    if (!foundItem) {
      return res.status(404).json({
        success: false,
        message: "Found item not found",
      });
    }

    // User cannot claim their own found item
    if (foundItem.foundBy.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot claim your own found item",
      });
    }

    // Item already claimed/returned
    if (foundItem.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "This item is no longer available",
      });
    }

    // Check if user already has a pending claim
    const existingClaim = await Claim.findOne({
      foundItem: foundItemId,
      claimedBy: req.user._id,
      status: "Pending",
    });

    if (existingClaim) {
      return res.status(400).json({
        success: false,
        message: "You have already claimed this item",
      });
    }

    // Create claim
    const claim = await Claim.create({
      foundItem: foundItemId,
      claimedBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Claim submitted successfully",
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

// Get claims for items owned by the logged-in user
export const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({
      foundItem: {
        $in: await FoundItem.find({
          foundBy: req.user._id,
        }).distinct("_id"),
      },
    })
      .populate("foundItem")
      .populate("claimedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update claim status
export const updateClaimStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate claim ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid claim ID",
      });
    }

    // Validate status
    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid claim status",
      });
    }

    // Find claim
    const claim = await Claim.findById(id).populate("foundItem");

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    // Only the owner of the found item can accept/reject
    if (
      claim.foundItem.foundBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this claim",
      });
    }

    // Claim already processed
    if (claim.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "This claim has already been processed",
      });
    }

    // Update claim status
    claim.status = status;
    await claim.save();

    // If accepted, mark found item as claimed
    if (status === "Accepted") {
      claim.foundItem.status = "Claimed";
      await claim.foundItem.save();
    }

    return res.status(200).json({
      success: true,
      message: `Claim ${status.toLowerCase()} successfully`,
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