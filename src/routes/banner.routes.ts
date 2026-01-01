import { Router } from "express";
import * as bannerController from "../controllers/banner.controller";
import { protect, adminOnly } from "../middlewares/auth";
import { bannerUpload } from "../middlewares/upload";
import { adminOrVendor } from "../middlewares/adminOrVendor";

const router = Router();

router.get("/", bannerController.getBanners);
router.get("/:id", bannerController.getBannerById);

router.post(
  "/",
  protect,
  adminOnly,
  bannerUpload.single("image"),
  bannerController.createBanner
);
router.put(
  "/:id",
  protect,
  adminOnly,
  bannerUpload.single("image"),
  bannerController.updateBanner
);
router.delete("/:id", protect, adminOnly, bannerController.deleteBanner);
router.patch(
  "/:id/activate",
  protect,
  adminOrVendor,
  bannerController.activateBanner
);
router.patch(
  "/:id/deactivate",
  protect,
  adminOrVendor,
  bannerController.deactivateBanner
);

export default router;
