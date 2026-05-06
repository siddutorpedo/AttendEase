import * as authService from "../services/authService.js";

/**
 * Register a new user
 */
export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      data: {
        message: "Registration successful",
        token: result.token,
        user: result.user,
        ...(result.student && { student: result.student }),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    res.json({
      success: true,
      data: {
        message: "Login successful",
        token: result.token,
        user: result.user,
        ...(result.student && { student: result.student }),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current logged in user
 */
export const getMe = async (req, res, next) => {
  try {
    const result = await authService.getMe(req.user._id);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
