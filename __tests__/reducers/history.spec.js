import { endQuiz as endQuizAction } from "source/actions/activeQuiz";
import historyReducer, { initialState } from "source/reducers/history";

const quizStartDate = "2017-12-30T18:30:00.000Z";
const quizEndDate = "2017-12-31T18:30:00.000Z";
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

describe("history reducer", () => {
  test("saves quiz in data on endQuiz action", () => {
    expect(
      historyReducer(
        initialState,
        endQuizAction(
          {
            ...dummyQuiz,
            questions: [
              {
                id: 1,
                type: "boolean",
                question: "1 + 1 = 2?",
                correct_answer: "True",
                incorrect_answers: ["False"],
                answer: { value: "True" }
              }
            ]
          },
          quizEndDate
        )
      )
    ).toMatchSnapshot();
  });

  test("ignores saving quiz if not complete on endQuiz action", () => {
    expect(
      historyReducer(initialState, endQuizAction(dummyQuiz, quizEndDate))
    ).toMatchSnapshot();
  });
});
