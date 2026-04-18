import ApiError from "../utils/ApiError.js";

/**
 * Joi validation middleware factory.
 * Usage: validate(joiSchema)
 * Validates req.body against the schema.
 */
const validate = (schema) => {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((d) => d.message);
      return next(ApiError.badRequest("Validation failed", messages));
    }

    // Replace body with validated/stripped value
    req.body = value;
    next();
  };
};

export default validate;
