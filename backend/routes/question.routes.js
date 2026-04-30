import express from "express";
import {
  createQuestion,
  getQuestionsByTest,
  getQuestionsByPYP,
  bulkUploadQuestions
} from "../controllers/question.controller.js";

const router = express.Router();

router.post("/", createQuestion);
router.post("/bulk", bulkUploadQuestions);

router.get("/test/:testId", getQuestionsByTest);
router.get("/pyp/:pypId", getQuestionsByPYP);

export default router;