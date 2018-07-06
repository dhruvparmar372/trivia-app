import { delay } from "redux-saga";
import { take, fork, put, cancel } from "redux-saga/effects";
import {
  startQuiz as startQuizAction,
  endQuiz as endQuizAction,
  updateQuizTime as updateQuizTimeAction
} from "source/actions/activeQuiz";

let timerPaused = false;
let secondsElapsed = 0;
function* trackQuizTime() {
  while (true) {
    yield delay(1000);
    if (!timerPaused) {
      secondsElapsed += 1;
      yield put(updateQuizTimeAction(secondsElapsed));
    }
  }
}

export default function*() {
  yield take(startQuizAction().type);
  const timer = yield fork(trackQuizTime);

  yield take(endQuizAction().type);
  yield cancel(timer);
}
