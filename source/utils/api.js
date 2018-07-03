export function parseQuestions(questions, quizId) {
  return questions.map((question, index) => ({
    ...question,
    id: `${quizId}${index}`
  }));
}
