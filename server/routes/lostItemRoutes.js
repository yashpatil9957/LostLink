import express from "express";
import {
  createLostItem,
  getAllLostItems,
  getLostItemById,
  updateLostItem,
  deleteLostItem,
} from "../controllers/lostItemController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createLostItem);

router.get("/", getAllLostItems);

router.get("/:id", getLostItemById);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateLostItem
);

router.delete("/:id", protect, deleteLostItem);

export default router;