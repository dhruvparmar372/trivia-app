import { takeLatest, put, select, take } from "redux-saga/effects";
import {
  fillQuizBank as fillQuizBankAction,
  fetchQuiz as fetchQuizAction
} from "source/actions/quizBank";
import {
  QUIZ_QUESTION_COUNT,
  QUIZ_DIFFICULTY,
  QUIZ_TYPE
} from "source/constants/app";

function* fillQuizBank(action) {
  const { data: pendingQuizzes } = yield select(state => state.quizBank);
  const { quizCount } = action;

  let quizzesToFetch = quizCount - pendingQuizzes.length;
  while (quizzesToFetch > 0) {
    const quizType = {
      amount: QUIZ_QUESTION_COUNT,
      difficulty: QUIZ_DIFFICULTY,
      type: QUIZ_TYPE
    };
    yield put(fetchQuizAction(quizType));
    yield take(fetchQuizAction.SUCCESS);
    quizzesToFetch--;
  }
}

export default function*() {
  yield takeLatest(fillQuizBankAction().type, fillQuizBank);
}
