import { createRoutine } from "redux-saga-routines";

export const fetchQuiz = createRoutine("QUIZBANK/FETCH");
export const addQuiz = quiz => ({
  type: "QUIZBANK/ADD",
  quiz
});

export const fillQuizBank = quizCount => ({
  type: "QUIZBANK/FILL",
  quizCount
});

export const setQuizFetchError = fetchErrorText => ({
  type: "QUIZBANK/SET_FETCH_ERROR",
  fetchErrorText
});
