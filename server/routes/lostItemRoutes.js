import express from "express";
import {
  createLostItem,
  getAllLostItems,
  getLostItemById,
  updateLostItem,
  deleteLostItem,
} from "../controllers/lostItemController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createLostItem);

router.get("/", getAllLostItems);

router.get("/:id", getLostItemById);

router.put("/:id", protect, updateLostItem);

router.delete("/:id", protect, deleteLostItem);

export default router;