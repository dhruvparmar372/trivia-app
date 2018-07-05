import { recordAnswer as recordAnswerAction } from "source/actions/activeQuiz";

const initialState = {
  firstQuestionAnswered: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case recordAnswerAction().type:
      return {
        ...state,
        firstQuestionAnswered: true
      };
    default:
      return state;
  }
}
