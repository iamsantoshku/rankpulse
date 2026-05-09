import dotenv from "dotenv";

dotenv.config();

export const checkEnv = () => {
  console.log("✅ ENV LOADED:");
  console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID ? "FOUND" : "MISSING");
};