import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.string().valid("admin", "teacher", "student").default("student"),
  // Student-specific fields (required when role is student)
  rollNo: Joi.when("role", {
    is: "student",
    then: Joi.string().trim().required(),
    otherwise: Joi.string().trim().optional(),
  }),
  branch: Joi.when("role", {
    is: "student",
    then: Joi.string().trim().required(),
    otherwise: Joi.string().trim().optional(),
  }),
  year: Joi.number().integer().min(1).max(6).optional(),
  section: Joi.string().trim().optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().required(),
});
