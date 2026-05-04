// import TestAttempt from "../models/TestAttempt.js";
// import Question from "../models/Question.js";
// import Test from "../models/Test.js";




// export const submitTest = async (req, res) => {
//   try {
//     const { testId, answers, timeTaken } = req.body;
//     const userId = req.user.id;

//     const questions = await Question.find({ test: testId });

//     let score = 0;
//     let correct = 0;
//     let wrong = 0;
//     let attempted = 0;

//     questions.forEach((q) => {
//       const ans = answers[q._id];

//       if (ans !== undefined) {
//         attempted++;

//         const correctIndex = q.options.findIndex(o => o.isCorrect);

//         if (ans === correctIndex) {
//           correct++;
//           score += q.marks;
//         } else {
//           wrong++;
//           score -= q.negativeMarks;
//         }
//       }
//     });

//     const attempt = await TestAttempt.create({
//       user: userId,
//       test: testId,
//       answers: Object.keys(answers).map(qid => ({
//         question: qid,
//         selected: answers[qid]
//       })),
//       score,
//       correct,
//       wrong,
//       attempted,
//       timeTaken
//     });

//     res.json({
//       score,
//       correct,
//       wrong,
//       attempted,
//       total: questions.length,
//       attemptId: attempt._id
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



// export const getAttemptById = async (req, res) => {
//   try {
//     const attempt = await TestAttempt.findById(req.params.id)
//       .populate({
//         path: "answers.question",
//         model: "Question"
//       })
//       .populate("test");

//     res.json(attempt);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET USER ATTEMPTS
// export const getUserAttempts = async (req, res) => {
//   const attempts = await Attempt.find({ user: req.user.id })
//     .populate("test")
//     .sort({ createdAt: -1 });

//   res.json(attempts);
// };

// // GET SINGLE ATTEMPT
// export const getAttemptById = async (req, res) => {
//   const attempt = await Attempt.findById(req.params.id)
//     .populate("test")
//     .populate("answers.questionId");

//   res.json(attempt);
// };



import TestAttempt from "../models/TestAttempt.js";
import Question from "../models/Question.js";
import Test from "../models/Test.js";

//
// ================= SUBMIT TEST =================
//
// export const submitTest = async (req, res) => {
//   try {
//     const { testId, answers, timeTaken, violations } = req.body;
//     const userId = req.user.id;

//     // 🔥 FETCH QUESTIONS (LEAN = FAST)
//     const questions = await Question.find({ test: testId }).lean();

//     let score = 0;
//     let correct = 0;
//     let wrong = 0;
//     let attempted = 0;

//     const formattedAnswers = [];

//     // 🔥 CALCULATION
//     for (const q of questions) {
//       const selected = answers[q._id];

//       if (selected !== undefined) {
//         attempted++;

//         const correctIndex = q.options.findIndex(o => o.isCorrect);
//         const isCorrect = selected === correctIndex;

//         let marksObtained = 0;

//         if (isCorrect) {
//           correct++;
//           marksObtained = q.marks;
//           score += q.marks;
//         } else {
//           wrong++;
//           marksObtained = -q.negativeMarks;
//           score -= q.negativeMarks;
//         }

//         formattedAnswers.push({
//           questionId: q._id,
//           selectedOption: selected,
//           isCorrect,
//           marksObtained
//         });
//       }
//     }

//     const total = questions.length;
//     const unattempted = total - attempted;

//     const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

//     const accuracy =
//       attempted > 0 ? Number(((correct / attempted) * 100).toFixed(2)) : 0;

//     // 🔥 GET TEST
//     const test = await Test.findById(testId).lean();

//     // 🔥 SAVE ATTEMPT
//     const attempt = await TestAttempt.create({
//       user: userId,
//       test: testId,
//       exam: test?.exam || null,
//       answers: formattedAnswers,
//       score,
//       totalMarks,
//       correct,
//       wrong,
//       attempted,
//       unattempted,
//       accuracy,
//       timeTaken,
//       violations
//     });

//     res.json({
//       attemptId: attempt._id,
//       score,
//       totalMarks,
//       correct,
//       wrong,
//       attempted,
//       unattempted,
//       accuracy
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

export const submitTest = async (req, res) => {
  try {
    const { testId, answers, timeTaken } = req.body;
    const userId = req.user.id;

    const questions = await Question.find({ test: testId });

    let score = 0;
    let correct = 0;
    let wrong = 0;
    let attempted = 0;

    const answerArray = [];

    questions.forEach((q) => {
      const ans = answers[q._id];
      const correctIndex = q.options.findIndex(o => o.isCorrect);

      if (ans !== undefined) {
        attempted++;

        const isCorrect = ans === correctIndex;

        if (isCorrect) {
          correct++;
          score += q.marks;
        } else {
          wrong++;
          score -= q.negativeMarks;
        }

        answerArray.push({
          questionId: q._id,
          selectedOption: ans,
          isCorrect,
          marksObtained: isCorrect ? q.marks : -q.negativeMarks
        });

      } else {
        answerArray.push({
          questionId: q._id,
          selectedOption: null,
          isCorrect: false,
          marksObtained: 0
        });
      }
    });

    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    const unattempted = questions.length - attempted;
    const accuracy = attempted ? (correct / attempted) * 100 : 0;

    // 🔥 SAVE ATTEMPT FIRST
    const attempt = await TestAttempt.create({
      user: userId,
      test: testId,
      answers: answerArray,
      score,
      totalMarks,
      correct,
      wrong,
      attempted,
      unattempted,
      accuracy,
      timeTaken
    });

    // 🔥 FETCH ALL ATTEMPTS FOR THIS TEST
    const allAttempts = await TestAttempt.find({ test: testId })
      .sort({ score: -1 });

    const totalUsers = allAttempts.length;

    // 🔥 CALCULATE RANK
    const rank =
      allAttempts.findIndex(a => a._id.toString() === attempt._id.toString()) + 1;

    // 🔥 CALCULATE PERCENTILE
    const usersBelow = totalUsers - rank;
    const percentile = (usersBelow / totalUsers) * 100;

    // 🔥 UPDATE CURRENT ATTEMPT
    attempt.rank = rank;
    attempt.percentile = percentile.toFixed(2);

    await attempt.save();

    res.json({
      score,
      correct,
      wrong,
      attempted,
      total: questions.length,
      rank,
      percentile,
      attemptId: attempt._id
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//
// ================= GET USER ATTEMPTS =================
//
export const getUserAttempts = async (req, res) => {
  try {
    const attempts = await TestAttempt.find({ user: req.user.id })
      .populate("test", "title duration")
      .sort({ createdAt: -1 })
      .lean();

    res.json(attempts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//
// ================= GET SINGLE ATTEMPT =================
//
export const getAttemptById = async (req, res) => {
  try {
    const attempt = await TestAttempt.findById(req.params.id)
      .populate("test", "title duration")
      .populate({
        path: "answers.questionId",
        model: "Question",
        select: "question options explanation"
      })
      .lean();

    res.json(attempt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// export const getLeaderboard = async (req, res) => {
//   try {
//     const { testId } = req.params;

//     const leaderboard = await TestAttempt.find({ test: testId })
//       .populate("user", "name email")
//       .sort({ score: -1 })
//       .limit(50); // top 50

//     res.json(leaderboard);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



export const getLeaderboard = async (req, res) => {
  try {
    const { testId } = req.params;

    if (!testId) {
      return res.status(400).json({ message: "TestId required" });
    }

    const attempts = await TestAttempt.find({ test: testId })
      .populate("user", "name email")
      .sort({ score: -1, timeTaken: 1 }); // 🔥 tie breaker

    const total = attempts.length;

    // 🔥 Assign rank + percentile
    const ranked = attempts.map((a, index) => {
      const rank = index + 1;

      const percentile = total
        ? (((total - rank) / total) * 100).toFixed(2)
        : 0;

      return {
        ...a._doc,
        rank,
        percentile,
        totalParticipants: total
      };
    });

    res.json(ranked);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};