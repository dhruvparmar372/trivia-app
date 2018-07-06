import _shuffle from "lodash.shuffle";

export function parseQuestions(questions, quizId) {
  return questions.map((question, index) => ({
    ...question,
    id: `${quizId}${index}`,
    answers: _shuffle([...question.incorrect_answers, question.correct_answer])
  }));
}
