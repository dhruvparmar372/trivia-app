import {
  isQuizComplete,
  getFirstUnansweredQuestion,
  isAnswerCorrect,
  getQuizScore
} from "source/utils/quiz";

function getQuiz(complete = false) {
  return {
    id: 1,
    questions: [
      {
        id: 1,
        type: "boolean",
        question: "1 + 1 = 2?",
        correct_answer: "True",
        incorrect_answers: ["False"],
        ...(complete ? { answer: { value: "True" } } : {})
      }
    ]
  };
}

describe("quiz utils", () => {
  test("return false if quiz is not present", () => {
    expect(isQuizComplete()).toMatchSnapshot();
  });
  test("return false if quiz is not complete", () => {
    expect(isQuizComplete(getQuiz())).toMatchSnapshot();
  });
  test("return true if quiz is complete", () => {
    expect(isQuizComplete(getQuiz(true))).toMatchSnapshot();
  });

  test("return first unanswered question", () => {
    expect(isQuizComplete(getQuiz())).toMatchSnapshot();
  });
  test("return null if no unanswered questions", () => {
    expect(isQuizComplete(getQuiz(true))).toMatchSnapshot();
  });

  test("return true if answer is correct", () => {
    const answeredQuestion = getQuiz(true).questions[0];
    expect(
      isAnswerCorrect(answeredQuestion, answeredQuestion.answer)
    ).toMatchSnapshot();
  });
  test("return false if answer is not correct", () => {
    const answeredQuestion = getQuiz(true).questions[0];
    answeredQuestion.answer.value = "False";
    expect(
      isAnswerCorrect(answeredQuestion, answeredQuestion.answer)
    ).toMatchSnapshot();
  });

  test("return quiz score", () => {
    expect(getQuizScore(getQuiz())).toMatchSnapshot();
  });
});
