import _unionBy from "lodash.unionby";
import {
  fetchQuiz as fetchQuizAction,
  addQuiz as addQuizAction,
  setQuizFetchError as setQuizFetchErrorAction
} from "source/actions/quizBank";
import { startQuiz as startQuizAction } from "source/actions/activeQuiz";

export const initialState = {
  data: [],
  fetching: false,
  fetchError: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case fetchQuizAction.TRIGGER:
      return {
        ...state,
        fetching: true,
        fetchError: ""
      };

    case fetchQuizAction.SUCCESS:
      return {
        ...state,
        fetchError: ""
      };

    case fetchQuizAction.FULFILL:
      return {
        ...state,
        fetching: false
      };

    case addQuizAction().type:
      return {
        ...state,
        data: _unionBy([action.quiz], state.data, "id")
      };

    case startQuizAction().type:
      return action.quiz
        ? {
            ...state,
            data: state.data.filter(quiz => quiz.id !== action.quiz.id)
          }
        : state;

    case setQuizFetchErrorAction().type:
      return {
        ...state,
        fetchError: action.fetchErrorText
      };

    default:
      return state;
  }
}
