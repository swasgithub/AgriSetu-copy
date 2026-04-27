import express from "express";
import { getMe, getAllUsers } from "../controllers/userController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMe);

// Only admin should see all users
router.get("/", protect, authorize("admin"), getAllUsers);

export default router;