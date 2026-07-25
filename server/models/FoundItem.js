import mongoose from "mongoose";

const foundItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    image: {
      type: String,
      default: "",
  },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Wallet",
        "Mobile",
        "Laptop",
        "Keys",
        "ID Card",
        "Bag",
        "Documents",
        "Jewelry",
        "Other",
      ],
    },

    status: {
      type: String,
      enum: ["Available", "Claimed", "Returned"],
      default: "Available",
    },

    foundBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [150, "Location cannot exceed 150 characters"],
    },

    dateFound: {
      type: Date,
      required: [true, "Date found is required"],
    },
  },
  {
    timestamps: true,
  }
);

const FoundItem = mongoose.model("FoundItem", foundItemSchema);

export default FoundItem;