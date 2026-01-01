import { Router } from "express";
import {
  approveVendor,
  getVendors,
  rejectVendor,
} from "../controllers/vendor.controller";
import { protect, adminOnly } from "../middlewares/auth";

const router = Router();

router.get("/", protect, adminOnly, getVendors);
router.patch("/:id/approve", protect, adminOnly, approveVendor);
router.patch("/:id/reject", protect, adminOnly, rejectVendor);

export default router;
