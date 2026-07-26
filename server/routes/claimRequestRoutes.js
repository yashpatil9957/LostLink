import express from "express";
import {
  createClaimRequest,
  getClaimRequests,
  approveClaimRequest,
  rejectClaimRequest,
} from "../controllers/claimRequestController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createClaimRequest);
router.get("/", protect, getClaimRequests);
router.put("/:id/approve", protect, approveClaimRequest);
router.put("/:id/reject", protect, rejectClaimRequest);

export default router;