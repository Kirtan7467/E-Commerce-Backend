import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
  title?: string;
  image: string;
  link?: string;
  isActive: boolean;
}

const bannerSchema = new Schema<IBanner>(
  {
    title: { type: String },
    image: { type: String, required: true },
    link: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBanner>("Banner", bannerSchema);
