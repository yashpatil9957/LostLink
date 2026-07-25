import mongoose from "mongoose";
import FoundItem from "../models/FoundItem.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const createFoundItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      dateFound,
    } = req.body;

    // Validate input
    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !dateFound
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    let imageUrl = "";

    if (req.file) {
    const result = await uploadToCloudinary(
      req.file.buffer,
      "found-items"
    );

    imageUrl = result.secure_url;
  }

    // Create found item
    const foundItem = await FoundItem.create({
      title,
      description,
      image: imageUrl,
      category,
      location,
      dateFound,
      foundBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Found item created successfully",
      foundItem,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllFoundItems = async (req, res) => {
  try {
    const foundItems = await FoundItem.find();

    return res.status(200).json({
      success: true,
      count: foundItems.length,
      foundItems,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getFoundItemById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID",
      });
    }

    // Find found item
    const foundItem = await FoundItem.findById(id);

    // Check if item exists
    if (!foundItem) {
      return res.status(404).json({
        success: false,
        message: "Found item not found",
      });
    }

    return res.status(200).json({
      success: true,
      foundItem,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateFoundItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID",
      });
    }

    // Find found item
    const foundItem = await FoundItem.findById(id);

    // Check if item exists
    if (!foundItem) {
      return res.status(404).json({
        success: false,
        message: "Found item not found",
      });
    }

    // Check ownership
    if (foundItem.foundBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this found item",
      });
    }

    let imageUrl = foundItem.image;

    //upload new image if provided
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "found-items"
      );

      imageUrl = result.secure_url;
    }

    // Update found item
    const updatedFoundItem = await FoundItem.findByIdAndUpdate(
      id,
      {
        ...req.body,
        image: imageUrl,
      },    
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Found item updated successfully",
      foundItem: updatedFoundItem,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteFoundItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID",
      });
    }

    // Find found item
    const foundItem = await FoundItem.findById(id);

    // Check if item exists
    if (!foundItem) {
      return res.status(404).json({
        success: false,
        message: "Found item not found",
      });
    }

    // Check ownership
    if (foundItem.foundBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this found item",
      });
    }

    // Delete found item
    await FoundItem.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Found item deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};