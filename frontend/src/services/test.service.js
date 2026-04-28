// import API from "../api/axios";

// export const createExam = (data) =>
//   API.post("/admin/exam", data);

// export const getExams = () =>
//   API.get("/admin/exam");

// export const getPopularTests = () =>
//   API.get("/admin/popular-exams");





import API from "../api/axios";

//
// ================= EXAMS =================
//

// ➕ Create Exam
export const createExam = (data) =>
  API.post("/admin/exam", data);

// 📄 Get All Exams
export const getExams = () =>
  API.get("/admin/exam");

// ⭐ Get Popular Exams
export const getPopularTests  = () =>
  API.get("/admin/popular-exams");

//
// ================= TEST SERIES =================
//

// ➕ Create Test Series
export const createTestSeries = (data) =>
  API.post("/test/test-series", data);




export const getTestSeriesByExam = (slug) =>
  API.get(`/test/test-series/${slug}`);





//
// ================= PREVIOUS YEAR PAPERS =================
//

// ➕ Create Previous Year Paper
export const createPYP = (data) =>
  API.post("/test/pyp", data);

// 📄 Get Previous Year Papers by Exam

export const getPYPByExam = (slug) =>
  API.get(`/test/pyp/${slug}`);



//adding prev year papaers and mocks paper

export const createQuestion = (data) =>
  API.post("/questions", data);





export const createTest = (data) =>
  API.post("/test-paper", data);

// ✅ FIXED
export const getTestsBySeries = (seriesId) =>
  API.get(`/test-paper/series/${seriesId}`);

export const getTestsByPYP = (pypId) =>
  API.get(`/test-paper/pyp/${pypId}`);

export const getQuestionsByPYP = (id) =>
  API.get(`/questions/pyp/${id}`);


export const getQuestionsByTest = (testId) =>
  API.get(`/questions/test/${testId}`);


export const getTestById = (id) =>
  API.get(`/test-paper/${id}`);



export const submitTest = (data) =>
  API.post("/attempts/submit", data);


export const getAttemptById = (id) =>
  API.get(`/attempts/${id}`);



// export const getExamStats = (slug) => {
//    API.get(`/exams/${slug}/stats`);
// };



// export const submitTest = (data) => {
//   return axios.post(`${API}/attempts/submit`, data, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`
//     }
//   });
// };

// // 🔥 GET RESULT
// export const getAttemptById = (id) => {
//   return axios.get(`${API}/attempts/${id}`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`
//     }
//   });
// };