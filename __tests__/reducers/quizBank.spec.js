import {
  fetchQuiz as fetchQuizAction,
  addQuiz as addQuizAction
} from "source/actions/quizBank";
import { startQuiz as startQuizAction } from "source/actions/activeQuiz";
import quizBankReducer, { initialState } from "source/reducers/quizBank";

const dummyQuiz = {
  id: 1,
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

describe("quizBank reducer", () => {
  test("sets fetching true on fetchQuizAction.TRIGGER", () => {
    expect(
      quizBankReducer(initialState, fetchQuizAction.trigger())
    ).toMatchSnapshot();
  });

  test("sets fetching false on fetchQuizAction.FULFILL", () => {
    expect(
      quizBankReducer({ data: [], fetching: true }, fetchQuizAction.fulfill())
    ).toMatchSnapshot();
  });

  test("adds quiz to data on addQuiz action", () => {
    expect(
      quizBankReducer(initialState, addQuizAction(dummyQuiz))
    ).toMatchSnapshot();
  });

  test("updates quiz inside data on addQuiz action", () => {
    expect(
      quizBankReducer(
        { data: [dummyQuiz] },
        addQuizAction({
          ...dummyQuiz,
          questions: [
            {
              id: 2,
              type: "boolean",
              question: "1 + 2 = 4?",
              correct_answer: "False",
              incorrect_answers: ["True"]
            }
          ]
        })
      )
    ).toMatchSnapshot();
  });

  test("removes quiz from data on startQuiz action", () => {
    expect(
      quizBankReducer({ data: [dummyQuiz] }, startQuizAction(dummyQuiz))
    ).toMatchSnapshot();
  });
});
