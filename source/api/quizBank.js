import api from "source/api";

export const fetchQuestions = params => api.get("/", { params });
