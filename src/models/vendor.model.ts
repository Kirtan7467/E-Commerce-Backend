import mongoose, { Schema, Document } from "mongoose";

export type VendorStatus = "pending" | "approved" | "rejected";

export interface IVendor extends Document {
  _id: any;
  user: mongoose.Types.ObjectId;
  shopName: string;
  email: string;
  username: string;
  contact: string;
  address?: string;
  status: VendorStatus;
  isActive: boolean;
}

const vendorSchema = new Schema<IVendor>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    shopName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    address: String,
    username: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IVendor>("Vendor", vendorSchema);
