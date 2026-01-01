import { Request } from "express";

export interface AuthUser {
  userId: string;
  role: "admin" | "vendor" | "user";
}

export interface MulterRequest extends Request {
  user?: AuthUser;
  file?: Express.Multer.File;
}
