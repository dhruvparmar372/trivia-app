import { all, fork } from "redux-saga/effects";
import { routinePromiseWatcherSaga } from "redux-saga-routines";
import quizBank from "./quizBank";
import initialize from "./initialize";

export default function*() {
  yield all([quizBank, initialize, routinePromiseWatcherSaga].map(fork));
}
