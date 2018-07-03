import { select, put } from "redux-saga/effects";
import { fetchQuiz as fetchQuizAction } from "source/actions/quizBank";

export default function*() {
  const { quizBank } = yield select(state => state);
  const hasPendingQuizzes = quizBank.data.length > 0;
  if (!hasPendingQuizzes) {
    const quizType = {
      amount: 10,
      difficulty: "hard",
      type: "boolean"
    };
    yield put(fetchQuizAction(quizType));
  }
}
