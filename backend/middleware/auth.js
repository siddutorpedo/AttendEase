import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

/**
 * Verify JWT token and attach user to req.
 * Works for all roles.
 */
const auth = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check if Authorization header is present and correctly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(ApiError.unauthorized("Authentication required. Please provide a Bearer token."));
    }

    // 2. Extract the token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(ApiError.unauthorized("Malformed authorization header. Token missing."));
    }

    // 3. Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Verify user still exists in the database
    // We select '-password' to avoid carrying sensitive data in the request object
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return next(ApiError.unauthorized("The user belonging to this token no longer exists."));
    }

    // 5. Attach user to request object and proceed
    req.user = user;
    next();
  } catch (error) {
    // 6. Handle specific JWT errors with descriptive messages
    if (error.name === "JsonWebTokenError") {
      return next(ApiError.unauthorized("Invalid token. Please log in again."));
    }
    if (error.name === "TokenExpiredError") {
      return next(ApiError.unauthorized("Your session has expired. Please log in again."));
    }

    // Pass any other unexpected errors (e.g., DB errors) to the global error handler
    next(error);
  }
};

export default auth;
