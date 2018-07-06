import { parseQuestions } from "source/utils/api";

const dummyQuizId = 201;
const dummyQuestions = [
  {
    question: "Question 1",
    incorrect_answers: [],
    correct_answer: "True"
  },
  {
    question: "Question 2",
    incorrect_answers: [],
    correct_answer: "True"
  }
];

test("parse questions adds id to all questions", () => {
  expect(parseQuestions(dummyQuestions, dummyQuizId)).toMatchSnapshot();
});
