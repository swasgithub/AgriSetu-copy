import express from "express";
import {
  createMachine,
  getAllMachines,
  getMachineById,
  updateMachine,
  deleteMachine,
  getMyMachines,
} from "../controllers/machineController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only equipment owners can create
router.post("/", protect, authorize("equipment_owner"), createMachine);

router.get("/", getAllMachines);
router.get("/my", protect, authorize("equipment_owner"), getMyMachines);
router.get("/:id", getMachineById);

// Only owner can update/delete (plus controller check)
router.put("/:id", protect, authorize("equipment_owner"), updateMachine);
router.delete("/:id", protect, authorize("equipment_owner"), deleteMachine);

export default router;