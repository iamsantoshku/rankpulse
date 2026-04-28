import express from "express";
import { submitTest, getAttemptById } from "../controllers/attempt.controller.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

// 🔥 SUBMIT TEST
router.post("/submit", protect, submitTest);

// 🔥 GET RESULT BY ATTEMPT ID
router.get("/:id", protect, getAttemptById);

export default router;