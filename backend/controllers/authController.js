import * as authService from "../services/authService.js";

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    // Also return student-compatible format for frontend
    res.status(201).json({
      message: "Registration successful",
      token: result.token,
      user: result.user,
      // Legacy compat: frontend expects { student: { id, name, email, rollNo, branch } }
      ...(result.user.role === "student" && {
        student: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
        },
      }),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    res.json({
      message: "Login successful",
      token: result.token,
      user: result.user,
      // Legacy compat
      ...(result.student && { student: result.student }),
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const result = await authService.getMe(req.user._id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
