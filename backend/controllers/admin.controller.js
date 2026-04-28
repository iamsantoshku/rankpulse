import Exam from "../models/Exam.js";
import TestSeries from "../models/TestSeries.js";


import slugify from "slugify";

// ➕ Create Exam
export const createExam = async (req, res) => {
  try {
    const { title, description, logo, isPopular } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const slug = slugify(title, { lower: true });

    const exam = await Exam.create({
      title,
      slug,
      description,
      logo,
      isPopular
    });

    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📄 Get All Exams
export const getExams = async (req, res) => {
  const exams = await Exam.find().sort({ createdAt: -1 });
  res.json(exams);
};


export const createTestSeries = async (req, res) => {
  const test = await TestSeries.create(req.body);
  res.json(test);
};




export const getPopularExams = async (req, res) => {
  try {
    const exams = await Exam.aggregate([
      { $match: { isPopular: true } },
      { $sample: { size: 5 } } // random 5
    ]);

    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};