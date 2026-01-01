import Joi from "joi";
import { password, phoneNumber } from "./custom.validation";

export const register = {
  body: Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    contact: Joi.string().custom(phoneNumber),
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
  }),
};

export const vendorregister = {
  body: Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    contact: Joi.string().custom(phoneNumber),
    shopName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
  }),
};

export const login = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

// export const logout = {
//   body: Joi.object({
//     refreshToken: Joi.string().required(),
//   }),
// };

// export const refreshTokens = {
//   body: Joi.object({
//     refreshToken: Joi.string().required(),
//   }),
// };

export const forgotPassword = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

export const resetPassword = {
  query: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
    newPassword: Joi.string().required().custom(password),
  }),
};

// export const verifyEmail = {
//   query: Joi.object({
//     token: Joi.string().required(),
//   }),
// };

