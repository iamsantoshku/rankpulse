import express from "express";
import {
  createExam,
  getExams,
  createTestSeries,
   getPopularExams,
   getAllUsers,
   getUserPerformance,
   getExamStats

} from "../controllers/admin.controller.js";

import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/exam", createExam);
router.get("/exam", getExams);

router.post("/test-series", createTestSeries);
router.get("/popular-exams" ,getPopularExams);


router.get("/users", protect, getAllUsers);
router.get("/users/:userId", protect, getUserPerformance);
router.get("/stats/exams", protect, getExamStats);

export default router;