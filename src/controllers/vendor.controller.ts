import { Request, Response } from "express";
import Vendor from "../models/vendor.model";
import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";

export const approveVendor = async (req: Request, res: Response) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) {
    throw new ApiError(404, "Vendor not found");
  }

  vendor.status = "approved";
  await vendor.save();

  await User.findByIdAndUpdate(vendor.user, {
    role: "vendor",
  });

  res.json({ message: "Vendor approved successfully" });
};

export const rejectVendor = async (req: Request, res: Response) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) {
    throw new ApiError(404, "Vendor not found");
  }

  vendor.status = "rejected";
  await vendor.save();

  // Optional: ensure user role stays "user"
  await User.findByIdAndUpdate(vendor.user, {
    role: "user",
  });

  res.status(200).json({
    message: "Vendor rejected successfully",
  });
};

export const getVendors = async (_req: Request, res: Response) => {
  const vendors = await Vendor.find().populate("user", "email role");
  res.json({ count: vendors.length, vendors });
};
