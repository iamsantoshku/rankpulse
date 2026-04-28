import express from "express";
import {
  createTestSeries,
  getTestSeriesByExam,
  createPYP,
  getPYPByExam
} from "../controllers/test.controller.js";

const router = express.Router();

// Test Series
router.post("/test-series", createTestSeries);
// router.get("/test-series/:examId", getTestSeriesByExam);
router.get("/test-series/:slug", getTestSeriesByExam);

// Previous Year
router.post("/pyp", createPYP);
router.get("/pyp/:slug", getPYPByExam);

export default router;