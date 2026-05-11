import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { protect } from "../middleware/authmiddleware.js";
import { getMe } from "../controllers/auth.controller.js";

const router = express.Router();



router.post("/register", register);
router.post("/login", login);

// router.get("/me", protect, (req, res) => {
//   res.json(req.user);
// });

router.get("/me", protect, getMe);

export default router;