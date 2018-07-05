import {
  startQuiz as startQuizAction,
  endQuiz as endQuizAction,
  recordAnswer as recordAnswerAction
} from "source/actions/activeQuiz";

const quizStartDate = "2017-12-30T18:30:00.000Z";
const quizEndDate = "2017-12-31T18:30:00.000Z";
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

describe("activeQuiz actions", () => {
  test("start quiz action", () => {
    expect(startQuizAction(dummyQuiz, quizStartDate)).toMatchSnapshot();
  });

  test("end quiz action", () => {
    expect(endQuizAction(dummyQuiz, quizEndDate)).toMatchSnapshot();
  });

  test("end quiz action", () => {
    expect(
      recordAnswerAction(dummyQuiz.id, dummyQuiz.questions[0].id, {
        value: "True"
      })
    ).toMatchSnapshot();
  });
});
