import _unionBy from "lodash.unionby";
import { endQuiz as endQuizAction } from "source/actions/activeQuiz";
import { isQuizComplete } from "source/utils/quiz";

export const initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case endQuizAction().type:
      return action.quiz && isQuizComplete(action.quiz)
        ? {
            data: _unionBy(
              [{ ...action.quiz, endedOn: action.endedOn }],
              state.data,
              "id"
            )
          }
        : state;

    default:
      return state;
  }
}
