import { takeLatest, put, select, take, race } from "redux-saga/effects";
import I18n from "react-native-i18n";
import {
  fillQuizBank as fillQuizBankAction,
  fetchQuiz as fetchQuizAction,
  setQuizFetchError as setQuizFetchErrorAction
} from "source/actions/quizBank";
import {
  QUIZ_QUESTION_COUNT,
  QUIZ_DIFFICULTY,
  QUIZ_TYPE
} from "source/constants/app";

function* fetchQuiz(quizType) {
  yield put(fetchQuizAction(quizType));
  return yield race({
    success: take(fetchQuizAction.SUCCESS),
    failure: take(fetchQuizAction.FAILURE)
  });
}

function* fillQuizBank(action) {
  const { data: pendingQuizzes } = yield select(state => state.quizBank);
  const { quizCount } = action;

  let quizzesToFetch = quizCount - pendingQuizzes.length;
  let refetchCount = 0;
  while (quizzesToFetch > 0) {
    const quizType = {
      amount: QUIZ_QUESTION_COUNT,
      difficulty: QUIZ_DIFFICULTY,
      type: QUIZ_TYPE
    };

    const { success, failure } = yield fetchQuiz(quizType);
    if (success) {
      quizzesToFetch--;
    } else if (failure) {
      refetchCount++;
      const { success, failure } = yield fetchQuiz(quizType);
      if (success) {
        quizzesToFetch--;
      } else if (failure) {
        refetchCount++;
      }
    }

    if (refetchCount >= 2) {
      yield put(setQuizFetchErrorAction(I18n.t("quizFetchError")));
      break;
    }

    refetchCount = 0;
  }
}

export default function*() {
  yield takeLatest(fillQuizBankAction().type, fillQuizBank);
}
