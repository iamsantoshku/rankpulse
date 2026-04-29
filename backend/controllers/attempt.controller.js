import TestAttempt from "../models/TestAttempt.js";
import Question from "../models/Question.js";
import Test from "../models/Test.js";




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




// controllers/attempt.controller.js




// export const submitTest = async (req, res) => {
//   try {
//     const { testId, answers, timeTaken } = req.body;

//     const userId = req.user._id;

//     // 🔥 GET TEST (to extract exam)
//     const test = await Test.findById(testId);

//     if (!test) {
//       return res.status(404).json({ message: "Test not found" });
//     }

//     const questions = await Question.find({ test: testId });

//     let score = 0;
//     let correct = 0;
//     let wrong = 0;
//     let attempted = 0;

//     let formattedAnswers = [];

//     questions.forEach((q) => {
//       const selected = answers[q._id];

//       let isCorrect = false;
//       let marksObtained = 0;

//       if (selected !== undefined) {
//         attempted++;

//         const correctIndex = q.options.findIndex(o => o.isCorrect);

//         if (selected === correctIndex) {
//           isCorrect = true;
//           correct++;
//           marksObtained = q.marks || 2;
//           score += marksObtained;
//         } else {
//           wrong++;
//           marksObtained = -(q.negativeMarks || 0.5);
//           score += marksObtained;
//         }
//       }

//       formattedAnswers.push({
//         questionId: q._id,
//         selectedOption: selected ?? null,
//         isCorrect,
//         marksObtained
//       });
//     });

//     const totalMarks = questions.reduce(
//       (sum, q) => sum + (q.marks || 2),
//       0
//     );

//     const unattempted = questions.length - attempted;

//     const accuracy = attempted
//       ? Number(((correct / attempted) * 100).toFixed(2))
//       : 0;

//     const attempt = await TestAttempt.create({
//       user: userId,
//       test: testId,
//       exam: test.exam || null, // ✅ important
//       answers: formattedAnswers,
//       score,
//       totalMarks,
//       correct,
//       wrong,
//       unattempted,
//       accuracy,
//       timeTaken
//     });

//     res.json({
//       attemptId: attempt._id,
//       score,
//       totalMarks,
//       correct,
//       wrong,
//       unattempted,
//       accuracy
//     });

//   } catch (err) {
//     console.error("❌ SUBMIT ERROR:", err.message);
//     res.status(500).json({ message: err.message });
//   }
// };


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