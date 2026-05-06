import * as authService from "../services/authService.js";

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      data: {
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
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    res.json({
      success: true,
      data: {
        message: "Login successful",
        token: result.token,
        user: result.user,
        // Legacy compat
        ...(result.student && { student: result.student }),
      },
    });
  } catch (error) {
    next(error);
  }
};

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

export const forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body.email);
    res.json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const result = await authService.resetPassword(req.body);
    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const result = await authService.verifyOTP(req.body);
    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
