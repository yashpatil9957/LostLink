import mongoose from "mongoose";

const claimRequestSchema = new mongoose.Schema(
  {
    claimant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lostItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LostItem",
      required: true,
    },

    foundItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoundItem",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: [300, "Message cannot exceed 300 characters"],
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const ClaimRequest = mongoose.model(
  "ClaimRequest",
  claimRequestSchema
);

export default ClaimRequest;