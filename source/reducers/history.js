import _unionBy from "lodash.unionby";
import { endQuiz as endQuizAction } from "source/actions/activeQuiz";

const initialState = {
  data: [] // is array of taken quizzes
};

export default function(state = initialState, action) {
  switch (action.type) {
    case endQuizAction().type:
      return action.quiz
        ? {
            data: _unionBy(
              [{ ...action.quiz, endedOn: new Date() }],
              state.data,
              "id"
            )
          }
        : state;

    default:
      return state;
  }
}
