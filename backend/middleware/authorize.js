import ApiError from "../utils/ApiError.js";

/**
 * Role-based authorization middleware.
 * Usage: authorize('admin', 'teacher')
 */
const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized("Not authenticated"));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          `Role '${req.user.role}' is not allowed to access this resource`
        )
      );
    }

    next();
  };
};

export default authorize;
