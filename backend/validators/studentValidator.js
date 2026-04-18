import Joi from "joi";

export const createStudentSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(6).max(128).required(),
  rollNo: Joi.string().trim().required(),
  branch: Joi.string().trim().required(),
  year: Joi.number().integer().min(1).max(6).optional(),
  section: Joi.string().trim().optional(),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  rollNo: Joi.string().trim().optional(),
  branch: Joi.string().trim().optional(),
  year: Joi.number().integer().min(1).max(6).optional(),
  section: Joi.string().trim().optional(),
});
