import Joi from "joi";

export const objectId = (
  value: string,
  helpers: Joi.CustomHelpers
) => {
  if (!/^[0-9a-fA-F]{24}$/.test(value)) {
    return helpers.error("any.invalid", {
      message: `"{{#label}}" must be a valid MongoDB ObjectId`,
    });
  }
  return value;
};

export const password = (
  value: string,
  helpers: Joi.CustomHelpers
) => {
  if (value.length < 8) {
    return helpers.error("any.invalid", {
      message: "password must be at least 8 characters",
    });
  }

  if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
    return helpers.error("any.invalid", {
      message: "password must contain at least 1 letter and 1 number",
    });
  }

  return value;
};
export const phoneNumber = (
  value: string,
  helpers: Joi.CustomHelpers
) => {
  // Allow only exactly 10 digits
  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(value)) {
    return helpers.error("any.invalid", {
      message: "phone number must be exactly 10 digits",
    });
  }

  return value;
};