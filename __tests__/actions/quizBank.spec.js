import {
  addQuiz as addQuizAction,
  fillQuizBank as fillQuizBankAction
} from "source/actions/quizBank";

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

describe("quizBank actions", () => {
  test("add quiz action", () => {
    expect(addQuizAction(dummyQuiz)).toMatchSnapshot();
  });

  test("fill quiz bank action", () => {
    expect(fillQuizBankAction(2)).toMatchSnapshot();
  });
});
