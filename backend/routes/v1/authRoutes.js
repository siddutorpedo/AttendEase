import express from "express";
import { register, login, getMe, forgotPassword, resetPassword, verifyOTP } from "../../controllers/authController.js";
import auth from "../../middleware/auth.js";
import validate from "../../middleware/validate.js";
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, verifyOTPSchema } from "../../validators/authValidator.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Stricter limiter for password reset routes to prevent abuse
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per window for these routes
  message: { success: false, message: "Too many attempts, please try again after 15 minutes" },
});

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", auth, getMe);

router.post("/forgot-password", authLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post("/verify-otp", authLimiter, validate(verifyOTPSchema), verifyOTP);
router.post("/reset-password", authLimiter, validate(resetPasswordSchema), resetPassword);

export default router;
