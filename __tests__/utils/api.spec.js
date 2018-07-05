import { parseQuestions } from "source/utils/api";

const dummyQuizId = 201;
const dummyQuestions = [
  {
    question: "Question 1"
  },
  {
    question: "Question 2"
  }
];

test("parse questions adds id to all questions", () => {
  expect(parseQuestions(dummyQuestions, dummyQuizId)).toMatchSnapshot();
});
