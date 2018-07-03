import { all, fork } from "redux-saga/effects";
import { routinePromiseWatcherSaga } from "redux-saga-routines";
import quizBank from "./quizBank";

export default function*() {
  yield all([quizBank, routinePromiseWatcherSaga].map(fork));
}
