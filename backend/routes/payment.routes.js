// routes/payment.routes.js

import express from "express";
import {
  createOrder,
  verifyPayment
} from "../controllers/payment.controller.js";

import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

// 🔥 CREATE ORDER
router.post("/create-order", protect, createOrder);

// 🔥 VERIFY PAYMENT
router.post("/verify", protect, verifyPayment);

export default router;