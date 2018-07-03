import { all, fork } from "redux-saga/effects";
import fetchQuiz from "./fetchQuiz";
import fillQuizBank from "./fillQuizBank";

export default function*() {
  yield all([fetchQuiz, fillQuizBank].map(fork));
}
