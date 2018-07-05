import {
  startQuiz as startQuizAction,
  endQuiz as endQuizAction,
  recordAnswer as recordAnswerAction
} from "source/actions/activeQuiz";

export const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case startQuizAction().type:
      return {
        ...action.quiz,
        startedOn: action.startedOn
      };

    case endQuizAction().type:
      return initialState;

    case recordAnswerAction().type:
      const { quizId, questionId, answer } = action;
      return state && state.id === action.quizId && answer
        ? {
            ...state,
            questions: state.questions.map(question => {
              return question.id === questionId
                ? {
                    ...question,
                    answer
                  }
                : question;
            })
          }
        : state;

    default:
      return state;
  }
}
