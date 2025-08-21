/*import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });
export const fetchQuestions = () => API.get("/exam/questions");

// Attach token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;*/

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
});

// Attach token automatically for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ====== Auth APIs ======

// Register
export const registerUser = (name, email, password) =>
  API.post("/auth/register", { name, email, password });

// Login
export const loginUser = (email, password) =>
  API.post("/auth/login", { email, password });

// ====== Exam APIs ======

// Fetch available subjects
export const fetchSubjects = () => API.get("/exam/subjects");

// Fetch questions
export const fetchQuestions = (subject, questionCount) => 
  API.get(`/exam/questions?subject=${subject}&questionCount=${questionCount}`);

// Submit exam answers
export const submitExam = (answers, timeTaken) => 
  API.post("/exam/submit", { answers, timeTaken });

// Get exam result
export const getExamResult = (resultId) => API.get(`/exam/result/${resultId}`);

// Get exam history
export const getExamHistory = () => API.get("/exam/history");

export default API;
