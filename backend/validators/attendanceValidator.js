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
