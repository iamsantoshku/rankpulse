// import express from "express";
// import {
//   fetchAndGenerateCA,
//   getCurrentAffairs,
//   publishCA
// } from "../controllers/currentAffair.controller.js";

// import { protect } from "../middleware/authmiddleware.js";

// const router = express.Router();

// router.post("/generate", protect, fetchAndGenerateCA);
// router.get("/", getCurrentAffairs);
// router.put("/publish/:id", protect, publishCA);

// export default router;


import express from "express";
import {
  fetchAndGenerateCA,
  getCurrentAffairs,
  getCAById,
  publishCA,
  deleteCA,
  getTodayCA
} from "../controllers/currentAffair.controller.js";

import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

// Public
// router.get("/", getAllCA);
// router.get("/:id", getCAById);

// // Admin / Protected
// router.post("/", protect, createCA);
// router.post("/generate", protect, generateCA);


router.post("/generate", fetchAndGenerateCA);
router.get("/", getCurrentAffairs);
router.get("/today", getTodayCA);
router.get("/:id", getCAById);

router.put("/publish/:id", protect, publishCA);
router.delete("/:id", protect, deleteCA);

export default router;