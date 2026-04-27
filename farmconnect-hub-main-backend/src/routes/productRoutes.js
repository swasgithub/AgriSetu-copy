import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import Product from "../models/product.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my", protect, authorize("supplier"), async (req, res) => {
  try {
    const products = await Product.find({
      supplier: req.user._id
    });

    res.json(products);
  } catch (error) {
    console.log("My Products Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/", getProducts);

router.get("/:id", getProductById);

// Only suppliers
router.post("/", protect, authorize("supplier"), createProduct);
router.put("/:id", protect, authorize("supplier"), updateProduct);
router.delete("/:id", protect, authorize("supplier"), deleteProduct);

export default router;