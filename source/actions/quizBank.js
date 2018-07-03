import { createRoutine } from "redux-saga-routines";

export const fetchQuiz = createRoutine("QUIZBANK/FETCH");
export const addQuiz = quiz => ({
  type: "QUIZBANK/ADD",
  quiz
});
