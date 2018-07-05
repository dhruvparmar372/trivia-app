import _unionBy from "lodash.unionby";
import {
  fetchQuiz as fetchQuizAction,
  addQuiz as addQuizAction
} from "source/actions/quizBank";
import { startQuiz as startQuizAction } from "source/actions/activeQuiz";

const initialState = {
  data: [
    // {
    //   id: 1,
    //   type: "boolean",
    //   questions: [
    //     {
    //       question: "yo",
    //       correct_answer: "True",
    //       incorrect_answers: ["False"],
    //       type: "boolean",
    //       category: "yolo"
    //     }
    //   ]
    // }
  ],
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

    case startQuizAction().type:
      return action.quiz
        ? {
            ...state,
            data: state.data.filter(quiz => quiz.id !== action.quiz.id)
          }
        : state;

    default:
      return state;
  }
}
