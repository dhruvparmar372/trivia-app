import { takeEvery, put, call } from "redux-saga/effects";
import {
  fetchQuiz as fetchQuizAction,
  addQuiz as addQuizAction
} from "source/actions/quizBank";
import { fetchQuestions as fetchQuestionsApi } from "source/api/quizBank";
import { parseQuestions } from "source/utils/api";

function* fetchQuiz(action) {
  const { payload: quizType } = action;
  try {
    const { data } = yield call(fetchQuestionsApi, quizType);
    if (data.response_code === 0 && data.results.length) {
      const quizId = new Date().getTime();
      yield put(
        addQuizAction({
          ...quizType,
          id: quizId,
          questions: parseQuestions(data.results, quizId)
        })
      );
    }
    yield put(fetchQuizAction.success());
  } catch (err) {
    yield put(fetchQuizAction.failure(err));
  }

  yield put(fetchQuizAction.fulfill());
}

export default function*() {
  yield takeEvery(fetchQuizAction.TRIGGER, fetchQuiz);
}
