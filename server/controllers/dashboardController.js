import LostItem from "../models/LostItem.js";
import FoundItem from "../models/FoundItem.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalLostItems,
      totalFoundItems,
      myLostItems,
      myFoundItems,
    ] = await Promise.all([
      LostItem.countDocuments(),
      FoundItem.countDocuments(),
      LostItem.countDocuments({
        owner: req.user._id,
      }),
      FoundItem.countDocuments({
        foundBy: req.user._id,
      }),
    ]);

    return res.status(200).json({
      success: true,
      dashboard: {
        totalLostItems,
        totalFoundItems,
        myLostItems,
        myFoundItems,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};