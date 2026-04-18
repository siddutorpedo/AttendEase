import Joi from "joi";

export const createSubjectSchema = Joi.object({
  name: Joi.string().trim().required(),
  code: Joi.string().trim().uppercase().required(),
  branch: Joi.string().trim().optional(),
  year: Joi.number().integer().min(1).max(6).optional(),
  teacher: Joi.string().hex().length(24).optional(), // ObjectId
  classId: Joi.string().hex().length(24).optional(),
});

export const updateSubjectSchema = Joi.object({
  name: Joi.string().trim().optional(),
  code: Joi.string().trim().uppercase().optional(),
  branch: Joi.string().trim().optional(),
  year: Joi.number().integer().min(1).max(6).optional(),
  teacher: Joi.string().hex().length(24).optional(),
  classId: Joi.string().hex().length(24).optional(),
});
