import DailyQuiz from "../models/DailyQuiz.js";


// ✅ CREATE QUIZ
export const createQuiz = async (req, res) => {

  try {

    const quiz = await DailyQuiz.create(req.body);

    res.status(201).json(quiz);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};


// ✅ GET ALL QUIZ
export const getAllQuiz = async (req, res) => {

  try {

    const quizzes = await DailyQuiz.find()
      .sort({ createdAt: -1 });

    res.json(quizzes);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};


// ✅ GET SINGLE QUIZ
export const getQuizById = async (req, res) => {

  try {

    const quiz = await DailyQuiz.findById(
      req.params.id
    );

    res.json(quiz);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};


// ✅ TODAY QUIZ
export const getTodayQuiz = async (req, res) => {

  try {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    const quiz = await DailyQuiz.findOne({
      date: {
        $gte: today,
        $lt: tomorrow
      }
    });

    res.json(quiz);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};


// ✅ DELETE QUIZ
export const deleteQuiz = async (req, res) => {

  try {

    await DailyQuiz.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Quiz deleted"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};