import express from "express";
import { register, login, getMe, forgotPassword, resetPassword } from "../../controllers/authController.js";
import auth from "../../middleware/auth.js";
import validate from "../../middleware/validate.js";
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from "../../validators/authValidator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", auth, getMe);

router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);

export default router;
