import API from "../api/axios";

//
// ================= DAILY QUIZ =================
//


// ➕ Create Daily Quiz
export const createQuiz = (data) =>
  API.post("/daily-quiz/create", data);


// 📄 Get All Daily Quiz
export const getAllQuiz = () =>
  API.get("/daily-quiz");


// 📅 Get Today Quiz
export const getTodayQuiz = () =>
  API.get("/daily-quiz/today");


// 🔍 Get Quiz By ID
export const getQuizById = (id) =>
  API.get(`/daily-quiz/${id}`);


// ❌ Delete Quiz
export const deleteQuiz = (id) =>
  API.delete(`/daily-quiz/${id}`);