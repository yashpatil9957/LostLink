import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema(
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
        enum: ["Lost", "Claimed", "Returned"],
        default: "Lost",
    },
    owner: {
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
    dateLost: {
        type: Date,
        required: [true, "Date lost is required"],
    },
    reward: {
        type: Number,
        default: 0,
        min: [0, "Reward cannot be negative"],
    },

    },
    {
        timestamps: true,
    } 
);

const LostItem = mongoose.model("LostItem", lostItemSchema);

export default LostItem;