import ApiError from "../utils/ApiError.js";

/**
 * Joi validation middleware factory.
 * Usage: validate(joiSchema)
 * Validates req.body against the schema.
 */
const validate = (schema, source = "body") => {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (error) {
      const messages = error.details.map((d) => d.message);
      return next(ApiError.badRequest("Validation failed", messages));
    }

    // Only overwrite body and params; merge query to avoid Express getter errors
    if (source === "body") req.body = value;
    else if (source === "params") req.params = value;
    else if (source === "query") Object.assign(req.query, value);

    next();
  };
};

export default validate;
