import API from "../api/axios";

// Register
export const registerUser = (data) =>
  API.post("/auth/register", data);

// Login
export const loginUser = (data) =>
  API.post("/auth/login", data);

// export const getPopularTests = () =>
//   API.get("/admin/popular-tests");

// export const createExam = (data) =>
//   API.post("/admin/exam", data);

// export const createTestSeries = (data) =>
//   API.post("/admin/test-series", data);