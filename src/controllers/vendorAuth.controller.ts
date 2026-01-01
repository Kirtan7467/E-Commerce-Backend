import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import Vendor from "../models/vendor.model";
import ApiError from "../utils/ApiError";

export const vendorRegister = async (req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    username,
    contact,
    email,
    password,
    shopName,
    address,
  } = req.body;

  if (!email || !password || !shopName) {
    throw new ApiError(400, "All fields are required");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(400, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstname,
    lastname,
    username,
    contact,
    email,
    password: hashedPassword,
    role: "user", // not vendor yet
  });

  const vendor = await Vendor.create({
    user: user._id,
    shopName,
    email,
    username,
    contact: contact,
    address,
  });

  res.status(201).json({
    message: "Vendor registered. Waiting for admin approval.",
    vendorId: vendor._id,
  });
};
