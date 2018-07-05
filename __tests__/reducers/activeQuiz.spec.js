import {
  startQuiz as startQuizAction,
  endQuiz as endQuizAction,
  recordAnswer as recordAnswerAction
} from "source/actions/activeQuiz";
import activeQuizReducer, { initialState } from "source/reducers/activeQuiz";

const quizStartDate = "2017-12-31T18:30:00.000Z";
const dummyQuiz = {
  id: 1,
  startedOn: quizStartDate,
  questions: [
    {
      id: 1,
      type: "boolean",
      question: "1 + 1 = 2?",
      correct_answer: "True",
      incorrect_answers: ["False"]
    }
  ]
};

describe("activeQuiz reducer", () => {
  test("sets quiz data on startQuiz action", () => {
    expect(
      activeQuizReducer(initialState, startQuizAction({ id: 1 }, quizStartDate))
    ).toMatchSnapshot();
  });

  test("removes quiz data on endQuiz action", () => {
    expect(activeQuizReducer(dummyQuiz, endQuizAction())).toMatchSnapshot();
  });

  test("saves answer for quiz question on recordAnswer action", () => {
    expect(
      activeQuizReducer(
        dummyQuiz,
        recordAnswerAction(dummyQuiz.id, dummyQuiz.questions[0].id, {
          value: "True"
        })
      )
    ).toMatchSnapshot();
  });

  test("ignores answer if quizId does not match active quiz on recordAnswer action", () => {
    expect(
      activeQuizReducer(
        dummyQuiz,
        recordAnswerAction(dummyQuiz.id + 1, dummyQuiz.questions[0].id, {
          value: "True"
        })
      )
    ).toMatchSnapshot();
  });

  test("ignores answer if questionId does not match active quiz question on recordAnswer action", () => {
    expect(
      activeQuizReducer(
        dummyQuiz,
        recordAnswerAction(dummyQuiz.id, dummyQuiz.questions[0].id + 1, {
          value: "True"
        })
      )
    ).toMatchSnapshot();
  });
});
