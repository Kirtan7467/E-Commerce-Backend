import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export const adminOrVendor = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.user.role !== "admin" && req.user.role !== "vendor") {
    return res.status(403).json({ message: "Admin or Vendor access only" });
  }

  next();
};
