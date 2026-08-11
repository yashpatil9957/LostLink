import express from "express";

import {
  createClaim,
  getMyClaims,
  updateClaimStatus,
} from "../controllers/claimController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a claim
router.post("/", protect, createClaim);

// Get claims related to user's found items
router.get("/", protect, getMyClaims);

// Accept / Reject claim
router.put("/:id", protect, updateClaimStatus);

export default router;