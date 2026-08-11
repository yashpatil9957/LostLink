import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    foundItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoundItem",
      required: true,
    },

    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Claim = mongoose.model("Claim", claimSchema);

export default Claim;