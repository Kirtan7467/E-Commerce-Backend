import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);

    const adminEmail = "admin@gmail.com";

    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) {
      console.log("✅ Admin already exists");
      process.exit(0);
    }

    const adminPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      firstname: "Admin",
      lastname: "patel",
      username: "admin",
      contact: "99999998",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    console.log("✅ Admin user seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Admin seed failed:", error);
    process.exit(1);
  }
};

seedAdmin();
