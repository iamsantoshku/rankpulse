// import express from "express";
// import cors from "cors";

// import userRoutes from "./routes/userRoutes.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/users", userRoutes);

// export default app;



import express from "express";
import cors from "cors";

// import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import testRoutes from "./routes/test.routes.js";
import questionRoutes from "./routes/question.routes.js";
import testPaperRoutes from "./routes/question.paper.routes.js";
import attemptRoutes from "./routes/attempt.routes.js";


const app = express();

// ✅ CORS (connect frontend)
// app.use(
//   cors({
//     origin: "http://localhost:5173", // React frontend URL    
//     credentials: true
//   })
// );

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rankpulse.onrender.com"
    ],
    credentials: true
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Routes

// app.use("/api/users", userRoutes); // user APIs
app.use("/api/auth", authRoutes); // authentication APIs
app.use("/api/admin", adminRoutes);
app.use("/api/test", testRoutes); // for test seres
app.use("/api/test-paper", testPaperRoutes); // for test papers
app.use("/api/questions", questionRoutes); // for questions
app.use("/api/attempts", attemptRoutes); // for test attempts
// app.use("/api/exams", examRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ Global Error Handler (important)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Something went wrong"
  });
});

export default app;