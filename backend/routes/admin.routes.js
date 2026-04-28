import express from "express";
import {
  createExam,
  getExams,
  createTestSeries,
   getPopularExams,
//   getPopularTests
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/exam", createExam);
router.get("/exam", getExams);

router.post("/test-series", createTestSeries);
router.get("/popular-exams" ,getPopularExams);

export default router;