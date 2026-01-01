import express from "express";
import authRoutes from "./routes/auth.routes";
import bannerRoutes from "./routes/banner.routes";
import productRoutes from "./routes/product.routes";
import vendorRoutes from "./routes/vendor.routes";
import vendorAuthRoutes from "./routes/vendorAuth.routes";
import cartRoutes from "./routes/cart.routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use("/auth", authRoutes);
app.use("/banner", bannerRoutes);
app.use("/product", productRoutes);
app.use("/vendor", vendorRoutes);
app.use("/vendorAuth", vendorAuthRoutes);
app.use("/cart", cartRoutes);

export default app;
