import express from "express";
import {
  createFoundItem,
  getAllFoundItems,
  getFoundItemById,
  updateFoundItem,
  deleteFoundItem,
} from "../controllers/foundItemController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createFoundItem);

router.get("/", getAllFoundItems);

router.get("/:id", getFoundItemById);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateFoundItem
);

router.delete("/:id", protect, deleteFoundItem);

export default router;