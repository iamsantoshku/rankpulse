

// routes/question.paper.routes.js

import express from "express";
import {
  createTest,
  getTestsBySeries,
  getTestsByPYP,
  getTestById // ✅ ADD THIS
} from "../controllers/testPaper.controller.js";

import { protect } from "../middleware/authmiddleware.js";
import { checkSubscription } from "../middleware/subscription.middleware.js";

const router = express.Router();

// ✅ CREATE TEST
router.post("/", createTest);
router.get("/test/:id", protect, checkSubscription, getTestById);
// router.post("/test-series", createTestSeries);

// ✅ GET SINGLE TEST
// router.get("/:id", getTestById);
router.get("/:id", getTestById);

// ✅ FILTERS
router.get("/series/:seriesId", getTestsBySeries);
router.get("/pyp/:pypId", getTestsByPYP);

export default router;