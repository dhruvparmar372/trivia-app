import {
  startQuiz as startQuizAction,
  endQuiz as endQuizAction
} from "source/actions/activeQuiz";

const initialState = {
  quiz: null,
  startedOn: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case startQuizAction().type:
      return {
        quiz: action.quiz,
        startedOn: new Date()
      };

    case endQuizAction().type:
      return initialState;

    default:
      return initialState;
  }
}
