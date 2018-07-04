export const startQuiz = quiz => ({
  type: "QUIZ/START",
  quiz
});

export const endQuiz = quiz => ({
  type: "QUIZ/END",
  quiz
});

export const recordAnswer = (quizId, questionId, answer) => ({
  type: "QUIZ/RECORD_ANSWER",
  quizId,
  questionId,
  answer
});
