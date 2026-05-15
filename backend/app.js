

// import express from "express";
// import cors from "cors";

// // import userRoutes from "./routes/userRoutes.js";
// import authRoutes from "./routes/auth.routes.js";
// import adminRoutes from "./routes/admin.routes.js";
// import testRoutes from "./routes/test.routes.js";
// import questionRoutes from "./routes/question.routes.js";
// import testPaperRoutes from "./routes/question.paper.routes.js";
// import attemptRoutes from "./routes/attempt.routes.js";


// const app = express();

// // ✅ CORS (connect frontend)


// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://rankpulse.onrender.com"
//     ],
//     credentials: true
//   })
// );

// // ✅ Middleware
// app.use(express.json());

// // ✅ Routes

// // app.use("/api/users", userRoutes); // user APIs
// app.use("/api/auth", authRoutes); // authentication APIs
// app.use("/api/admin", adminRoutes);
// app.use("/api/test", testRoutes); // for test seres
// app.use("/api/test-paper", testPaperRoutes); // for test papers
// app.use("/api/questions", questionRoutes); // for questions
// app.use("/api/attempts", attemptRoutes); // for test attempts
// // app.use("/api/exams", examRoutes);

// // ✅ Health check route
// app.get("/", (req, res) => {
//   res.send("🚀 API is running...");
// });

// // ✅ Global Error Handler (important)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: err.message || "Something went wrong"
//   });
// });

// export default app;






import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import testRoutes from "./routes/test.routes.js";
import questionRoutes from "./routes/question.routes.js";
import testPaperRoutes from "./routes/question.paper.routes.js";
import attemptRoutes from "./routes/attempt.routes.js";
import currentAffairRoutes from "./routes/currentAffair.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import dailyQuizRoutes from "./routes/dailyQuiz.routes.js";
import studyNoteRoutes from "./routes/studyNote.routes.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================================
   🔐 SECURITY MIDDLEWARE
========================================= */

// Secure HTTP headers
app.use(helmet());

// Gzip compression (faster responses)
app.use(compression());

/* =========================================
   🌍 CORS (Production Ready)
========================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://rankpulse.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman / mobile apps

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

/* =========================================
   🚫 RATE LIMIT (Anti abuse)
========================================= */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200, // limit per IP
  message: "Too many requests, please try again later"
});

app.use("/api", limiter);

/* =========================================
   📦 BODY PARSER (Safe limit)
========================================= */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* =========================================
   📊 LOGGING
========================================= */

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}



app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

/* =========================================
   🧭 ROUTES
========================================= */

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/test", testRoutes);
app.use("/api/test-paper", testPaperRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/current-affairs", currentAffairRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/daily-quiz", dailyQuizRoutes);
app.use(
  "/uploads",
  express.static("uploads")
);

// app.use(
//   "/api/study-notes",
//   studyNoteRoutes
// );
app.use("/api/ai", aiRoutes);

/* =========================================
   ❤️ HEALTH CHECK
========================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "🚀 RankPulse API is running"
  });
});

/* =========================================
   ❌ 404 HANDLER
========================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/* =========================================
   💥 GLOBAL ERROR HANDLER
========================================= */

app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

export default app;