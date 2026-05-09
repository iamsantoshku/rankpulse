// controllers/payment.controller.js

import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/userModels.js";



if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay keys missing in ENV");
}

export const razorpay= new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || ""
});

// ✅ CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { plan } = req.body;

    const amount =
      plan === "yearly" ? 99900 : 19900; // ₹999 / ₹199 (paise)

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed"
      });
    }

    // 🔥 UPDATE USER SUBSCRIPTION
    const user = await User.findById(req.user.id);

    let expiry = new Date();

    if (plan === "monthly") {
      expiry.setMonth(expiry.getMonth() + 1);
    } else {
      expiry.setFullYear(expiry.getFullYear() + 1);
    }

    user.isSubscribed = true;
    user.subscriptionPlan = plan;
    user.subscriptionExpires = expiry;

    await user.save();

    res.json({ message: "Subscription activated" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


