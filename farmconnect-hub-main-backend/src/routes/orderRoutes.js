// routes/orderRoutes.js

import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getSupplierOrders,
} from "../controllers/orderController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only farmers create orders
router.post("/", protect, authorize("farmer"), createOrder);

router.get("/my", protect, getMyOrders);
router.get("/supplier", protect, authorize("supplier"), getSupplierOrders);
router.get("/:id", protect, getOrderById);

// Optional: restrict to admin/supplier later
router.put("/:id/status", protect, updateOrderStatus);

export default router;