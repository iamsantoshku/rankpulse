import express from "express";

import {
  createQuiz,
  getAllQuiz,
  getQuizById,
  getTodayQuiz,
  deleteQuiz
} from "../controllers/dailyQuiz.controller.js";

import {
  protect
} from "../middleware/authMiddleware.js";

const router = express.Router();


// USER
router.get("/today", getTodayQuiz);

router.get("/:id", getQuizById);


// ADMIN
router.post("/create", protect, createQuiz);

router.get("/", protect, getAllQuiz);

router.delete("/:id", protect, deleteQuiz);

export default router;