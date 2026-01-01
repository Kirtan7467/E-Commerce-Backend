import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import validate from "../middlewares/validate";
import { authValidation } from "../validations";

const router = Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

router.post("/login", validate(authValidation.login), authController.login);

router.post(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);

router.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  authController.resetPassword
);

export default router;
