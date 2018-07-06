import { all, fork } from "redux-saga/effects";
import { routinePromiseWatcherSaga } from "redux-saga-routines";
import quizBank from "./quizBank";
import activeQuiz from "./activeQuiz";

export default function*() {
  yield all([quizBank, activeQuiz, routinePromiseWatcherSaga].map(fork));
}
