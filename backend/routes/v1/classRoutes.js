import express from "express";
import {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
} from "../../controllers/classController.js";
import auth from "../../middleware/auth.js";
import authorize from "../../middleware/authorize.js";

const router = express.Router();

// GET all (public — frontend needs it)
router.get("/", getClasses);

// GET single
router.get("/:id", getClassById);

// CREATE — admin only
router.post("/", auth, authorize("admin"), createClass);

// UPDATE — admin only
router.put("/:id", auth, authorize("admin"), updateClass);

// DELETE — admin only
router.delete("/:id", auth, authorize("admin"), deleteClass);

export default router;
