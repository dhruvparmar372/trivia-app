export const startQuiz = quiz => ({
  type: "QUIZ/START",
  quiz
});

export const endQuiz = quiz => ({
  type: "QUIZ/END",
  quiz
});
