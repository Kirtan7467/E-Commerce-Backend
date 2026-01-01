import { Router } from "express";
import { vendorRegister } from "../controllers/vendorAuth.controller";
import validate from "../middlewares/validate";
import { authValidation } from "../validations";

const router = Router();

router.post(
  "/register",
  validate(authValidation.vendorregister),
  vendorRegister
);

export default router;
