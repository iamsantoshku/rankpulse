// import dotenv from "dotenv";
// import app from "./app.js";
// import { connectDB } from "./config/db.js";

// dotenv.config();

// // Connect DB
// connectDB();

// // Start Server
// const PORT = process.env.PORT || 5050;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



// import dotenv from "dotenv";

// // 🔥 MUST BE FIRST
// dotenv.config();

// import app from "./app.js";
// import { connectDB } from "./config/db.js";

// // Connect DB
// connectDB();

// // Start Server
// const PORT = process.env.PORT || 5050;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



// import dotenv from "dotenv";

// // 🔥 MUST BE FIRST LINE (before any other import)
// dotenv.config();

// import app from "./app.js";
// import { connectDB } from "./config/db.js";

// // ✅ DEBUG (keep this temporarily)
// console.log("ENV CHECK:", process.env.OPENAI_API_KEY ? "FOUND" : "MISSING");
// console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_ID);
// console.log("RAZORPAY SECRET:", process.env.RAZORPAY_KEY_SECRET);

// // Connect DB
// connectDB();

// const PORT = process.env.PORT || 5050;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


// import dotenv from "dotenv";
// dotenv.config(); // ✅ MUST BE FIRST

// import app from "./app.js";
// import { connectDB } from "./config/db.js";

// console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_ID); // debug

// connectDB();

// const PORT = process.env.PORT || 5050;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



// 🔥 MUST BE FIRST IMPORT
import "./config/env.js";

import app from "./app.js";
import { connectDB } from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});