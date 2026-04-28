



import Question from "../models/Question.js";

// ➕ CREATE QUESTION




export const createQuestion = async (req, res) => {
  try {
    const data = req.body;

    // ✅ VALIDATION
    if (!data.test) {
      return res.status(400).json({ message: "Test ID required" });
    }

    if (!data.question?.en) {
      return res.status(400).json({ message: "Question (EN) required" });
    }

    if (!data.options || data.options.length < 2) {
      return res.status(400).json({ message: "At least 2 options required" });
    }

    const question = await Question.create({
      question: data.question,
      options: data.options,
      explanation: data.explanation,
      test: data.test,
      section: data.section || "General",
      subject: data.subject || "",
      difficulty: data.difficulty || "easy",
      marks: Number(data.marks) || 2,
      negativeMarks: Number(data.negativeMarks) || 0.5,
      type: data.type || "mcq",
      correctAnswer: data.correctAnswer || null
    });

    res.status(201).json(question);
  } catch (err) {
    console.error("❌ ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};


// 📄 GET QUESTIONS BY TEST

export const getQuestionsByTest = async (req, res) => {
  const { testId } = req.params;

  const questions = await Question.find({
    test: testId
  });

  res.json(questions);
};



// 📄 GET QUESTIONS BY TEST SERIES


// 📄 GET QUESTIONS BY PYP




export const getQuestionsByPYP = async (req, res) => {
  const { pypId } = req.params;

  const questions = await Question.find({
    pyp: pypId
  });

  res.json(questions);
};