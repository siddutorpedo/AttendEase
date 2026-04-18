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

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw ApiError.unauthorized("No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      throw ApiError.unauthorized("User no longer exists");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(ApiError.unauthorized("Invalid token"));
    }
    if (error.name === "TokenExpiredError") {
      return next(ApiError.unauthorized("Token expired"));
    }
    next(error);
  }
};

export default auth;
