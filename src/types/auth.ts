import { Request } from "express";

export interface AuthUser {
  userId: string;
  role: "user" | "admin" | "vendor";
  vendorId?: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
