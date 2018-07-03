import _unionBy from "lodash.unionby";
import {
  fetchQuiz as fetchQuizAction,
  addQuiz as addQuizAction
} from "source/actions/quizBank";

const initialState = {
  data: [],
  fetching: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case fetchQuizAction.TRIGGER:
      return {
        ...state,
        fetching: true
      };

    case fetchQuizAction.SUCCESS:
      return {
        ...state,
        fetching: false
      };

    case addQuizAction().type:
      return {
        ...state,
        data: _unionBy([action.quiz], state.data, "id")
      };

    default:
      return state;
  }
}
