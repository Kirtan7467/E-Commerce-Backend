import mongoose from "mongoose";
import bcrypt from "bcrypt";

export type UserRole = "user" | "admin";

export interface IUser {
  _id: any;
  firstname: string;
  lastname: string;
  username: string;
  contact: string;
  email: string;
  password: string;
  role: UserRole;
  otp?: string;
  otpExpires?: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin", "vendor"],
    default: "user",
  },
  otp: String,
  otpExpires: Date,
});

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
