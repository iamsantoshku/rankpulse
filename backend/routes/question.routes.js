import express from "express";
import {
  createQuestion,
  getQuestionsByTest,
  getQuestionsByPYP
} from "../controllers/question.controller.js";

const router = express.Router();

router.post("/", createQuestion);

router.get("/test/:testId", getQuestionsByTest);
router.get("/pyp/:pypId", getQuestionsByPYP);

export default router;