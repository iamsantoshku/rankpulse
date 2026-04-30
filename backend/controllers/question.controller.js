



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




export const getQuestionsByPYP = async (req, res) => {
  const { pypId } = req.params;

  const questions = await Question.find({
    pyp: pypId
  });

  res.json(questions);
};



export const bulkUploadQuestions = async (req, res) => {
  try {
    const { questions, testId } = req.body;

    if (!testId) {
      return res.status(400).json({ message: "Test ID required" });
    }

    if (!questions || !questions.length) {
      return res.status(400).json({ message: "Questions array required" });
    }

    const formatted = questions.map((q, index) => {
      if (!q.question || !q.options || q.correctIndex === undefined) {
        throw new Error(`Invalid question at index ${index}`);
      }

      return {
        question: {
          en: q.question,
          hi: q.questionHi || ""
        },

        options: q.options.map((opt, i) => ({
          text: {
            en: opt,
            hi: ""
          },
          isCorrect: i === q.correctIndex
        })),

        explanation: {
          en: q.explanation || "",
          hi: ""
        },

        test: testId,
        section: q.section || "General",
        subject: q.subject || "",
        difficulty: q.difficulty || "easy",
        marks: Number(q.marks) || 2,
        negativeMarks: Number(q.negativeMarks) || 0.5,
        type: "mcq"
      };
    });

    const inserted = await Question.insertMany(formatted);

    res.json({
      message: "✅ Bulk upload successful",
      count: inserted.length
    });

  } catch (err) {
    console.error("❌ BULK ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};