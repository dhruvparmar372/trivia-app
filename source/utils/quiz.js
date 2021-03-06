export function isQuizComplete(quiz) {
  return quiz
    ? quiz.questions.reduce(
        (isComplete, question) => isComplete && !!question.answer,
        true
      )
    : false;
}

export function getFirstUnansweredQuestion(quiz) {
  return quiz
    ? quiz.questions.reduce(
        (accum, question) => accum || (question.answer ? null : question),
        null
      )
    : null;
}

export function isAnswerCorrect(question = {}, answer = {}) {
  const { value } = answer;
  const { correct_answer } = question;
  if (!value || !correct_answer) {
    return false;
  }

  switch (question.type) {
    case "boolean":
      return correct_answer === value;
    default:
      return correct_answer === value;
  }
}

export function getQuizScore(quiz) {
  if (!quiz) {
    return {};
  }

  const total = quiz.questions.length;
  const correct = quiz.questions.reduce(
    (count, question) =>
      count + (isAnswerCorrect(question, question.answer) ? 1 : 0),
    0
  );

  return {
    correct,
    total
  };
}

export function getFormattedTimeElapsed(quiz) {
  if (!quiz || !quiz.timeTaken) {
    return "";
  }
  const { timeTaken } = quiz;
  let minutes = Math.floor(timeTaken / 60);
  let seconds = timeTaken % 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}
