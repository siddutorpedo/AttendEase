import Joi from "joi";

export const markAttendanceSchema = Joi.object({
  subjectId: Joi.string().hex().length(24).required(),
  date: Joi.string().isoDate().required(),
  records: Joi.array()
    .items(
      Joi.object({
        studentId: Joi.string().hex().length(24).required(),
        status: Joi.string().valid("present", "absent").required(),
      })
    )
    .min(1)
    .required(),
});

export const paginationQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(50),
  subjectId: Joi.string().hex().length(24),
  from: Joi.string().isoDate(),
  to: Joi.string().isoDate(),
});

export const thresholdQuerySchema = Joi.object({
  threshold: Joi.number().min(0).max(100).default(75),
  subjectId: Joi.string().hex().length(24),
});
