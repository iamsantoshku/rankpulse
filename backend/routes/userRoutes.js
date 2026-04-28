import express from "express";
import {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rolemiddleware.js";

const router = express.Router();

// 👤 User
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);

// 👑 Admin
router.get("/", protect, authorize("ADMIN"), getAllUsers);
router.delete("/:id", protect, authorize("ADMIN"), deleteUser);

export default router;