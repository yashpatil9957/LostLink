import express from "express";
import {
  createFoundItem,
  getAllFoundItems,
  getFoundItemById,
  updateFoundItem,
  deleteFoundItem,
} from "../controllers/foundItemController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createFoundItem);

router.get("/", getAllFoundItems);

router.get("/:id", getFoundItemById);

router.put("/:id", protect, updateFoundItem);

router.delete("/:id", protect, deleteFoundItem);

export default router;