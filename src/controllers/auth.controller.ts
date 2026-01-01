import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { IUser, User } from "../models/user.model";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail";

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, username, contact, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return res.status(500).json({ message: "JWT_SECRET not defined" });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstname,
    lastname,
    username,
    contact,
    email,
    password: hashedPass,
  });

  const token = jwt.sign(
    { userId: user._id.toString(), role: user.role },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.status(201).json({
    message: "Registered successfully",
    token,
    user: {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      contact: user.contact,
      email: user.email,
      role: user.role,
    },
  });
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET not defined" });
    }

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token: string = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        contact: user.contact,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: unknown) {
    return res.status(500).json({
      message: "Login error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = crypto.randomInt(100000, 999999).toString();

  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  try {
    await sendEmail(
      email,
      "Reset Password OTP",
      `
        <h2>Password Reset</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>Valid for 10 minutes</p>
      `
    );
  } catch (error) {
    console.error("Email send failed:", error);
    return res.status(500).json({ message: "Failed to send OTP email" });
  }

  res.json({ message: "OTP sent to email" });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (
    !user ||
    user.otp !== otp ||
    !user.otpExpires ||
    user.otpExpires < new Date()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};
