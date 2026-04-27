import express from "express";
import {
  createRent,
  getMyRentals,
  getOwnerRentals,
  updateRentStatus,
} from "../controllers/rentController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only farmers rent
router.post("/", protect, authorize("farmer"), createRent);

// Farmer view
router.get("/my", protect, authorize("farmer"), getMyRentals);

// Owner view
router.get("/owner", protect, authorize("equipment_owner"), getOwnerRentals);

// Owner updates status
router.put("/:id/status", protect, authorize("equipment_owner"), updateRentStatus);

export default router;