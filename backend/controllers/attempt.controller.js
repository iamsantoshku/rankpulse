import TestAttempt from "../models/TestAttempt.js";
import Question from "../models/Question.js";

export const submitTest = async (req, res) => {
  try {
    const { testId, answers, timeTaken } = req.body;
    const userId = req.user.id;

    const questions = await Question.find({ test: testId });

    let score = 0;
    let correct = 0;
    let wrong = 0;
    let attempted = 0;

    questions.forEach((q) => {
      const ans = answers[q._id];

      if (ans !== undefined) {
        attempted++;

        const correctIndex = q.options.findIndex(o => o.isCorrect);

        if (ans === correctIndex) {
          correct++;
          score += q.marks;
        } else {
          wrong++;
          score -= q.negativeMarks;
        }
      }
    });

    const attempt = await TestAttempt.create({
      user: userId,
      test: testId,
      answers: Object.keys(answers).map(qid => ({
        question: qid,
        selected: answers[qid]
      })),
      score,
      correct,
      wrong,
      attempted,
      timeTaken
    });

    res.json({
      score,
      correct,
      wrong,
      attempted,
      total: questions.length,
      attemptId: attempt._id
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// export const getAttemptById = async (req, res) => {
//   try {
//     const attempt = await TestAttempt.findById(req.params.id)
//       .populate("test")
//       .populate("answers.question");

//     if (!attempt) {
//       return res.status(404).json({ message: "Attempt not found" });
//     }

//     res.json(attempt);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// controllers/attempt.controller.js

export const getAttemptById = async (req, res) => {
  try {
    const attempt = await TestAttempt.findById(req.params.id)
      .populate({
        path: "answers.question",
        model: "Question"
      })
      .populate("test");

    res.json(attempt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};