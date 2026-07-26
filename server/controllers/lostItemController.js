import mongoose from "mongoose";
import LostItem from "../models/LostItem.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const createLostItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      datelost,
      reward,
    } = req.body;

    // Validate input
    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !datelost
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    let imageUrl = null;

    // Upload image to Cloudinary if provided
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "lost-items"
      );

      imageUrl = result.secure_url;
    }

    const lostItem = await LostItem.create({
        title,
        description,
        image: imageUrl,
        category,
        location,
        datelost,
        reward,
        owner: req.user._id,
    });

    return res.status(201).json({
        success: true,
        message: "Lost item created successfully",
        lostItem,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllLostItems = async (req, res) => {
  try {
    const {
      search,
      category,
      status,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    let query = {};

    const skip = (pageNumber - 1) * limitNumber;

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category) {
      query.category = category;
    }
    if (status) {
      query.status = status;
    }

    let sortOption = { createdAt: -1 };
    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    const totalItems = await LostItem.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limitNumber);

    const lostItems = await LostItem.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber)  //string -> number

    return res.status(200).json({
      success: true,
      page: pageNumber,
      limit: limitNumber,
      totalItems,
      totalPages,
      count: lostItems.length,
      lostItems,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getLostItemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
        success: false,
        message: "Invalid item ID",
    });
}
    const lostItem = await LostItem.findById(id);

    if (!lostItem) {
      return res.status(404).json({
        success: false,
        message: "Lost item not found",
      });
    }

    return res.status(200).json({
      success: true,
      lostItem,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateLostItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID",
      });
    }

    // Find lost item
    const lostItem = await LostItem.findById(id);

    // Check if item exists
    if (!lostItem) {
      return res.status(404).json({
        success: false,
        message: "Lost item not found",
      });
    }

    if (lostItem.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this item",
      });
    }

    let imageUrl = lostItem.image;

    // Upload new image if provided
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "lost-items"
      );

      imageUrl = result.secure_url;
    }

    //Update lost item
    const updatedLostItem = await LostItem.findByIdAndUpdate(
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
        message: "Lost item updated successfully",
        lostItem: updatedLostItem,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteLostItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID",
      });
    }

    // Find lost item
    const lostItem = await LostItem.findById(id);

    // Check if item exists
    if (!lostItem) {
      return res.status(404).json({
        success: false,
        message: "Lost item not found",
      });
    }

    // Check ownership
    if (lostItem.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this item",
      });
    }

    // Delete item
    await LostItem.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Lost item deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};