export const startQuiz = (quiz, startedOn) => ({
  type: "QUIZ/START",
  quiz,
  startedOn
});

export const endQuiz = (quiz, endedOn) => ({
  type: "QUIZ/END",
  quiz,
  endedOn
});

export const recordAnswer = (quizId, questionId, answer) => ({
  type: "QUIZ/RECORD_ANSWER",
  quizId,
  questionId,
  answer
});
