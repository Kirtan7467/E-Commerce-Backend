import { Router } from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  mergeCart,
} from "../controllers/cart.controller";
import { protect } from "../middlewares/auth";

const router = Router();

// Get current user's cart
router.get("/", protect, getCart);

// Add product to cart
router.post("/add", protect, addToCart);

// merge product to cart
router.post("/merge", protect, mergeCart);

// Update product quantity
router.put("/update", protect, updateCartItem);

// Remove product from cart
router.delete("/remove/:productId", protect, removeCartItem);

// Clear entire cart
router.delete("/clear", protect, clearCart);

export default router;
