// import express from "express";
// import { submitTest, getAttemptById } from "../controllers/attempt.controller.js";
// import { protect } from "../middleware/authmiddleware.js";

// const router = express.Router();

// // 🔥 SUBMIT TEST
// router.post("/submit", protect, submitTest);

// // 🔥 GET RESULT BY ATTEMPT ID
// router.get("/:id", protect, getAttemptById);

// export default router;



import express from "express";
import {
  submitTest,
  getAttemptById,
  getUserAttempts,
    getLeaderboard
} from "../controllers/attempt.controller.js"

import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/submit", protect, submitTest);
router.get("/", protect, getUserAttempts);
router.get("/:id", protect, getAttemptById);
router.get("/leaderboard/:testId", protect, getLeaderboard);

export default router;