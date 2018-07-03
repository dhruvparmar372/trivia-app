import { combineReducers } from "redux";
import quizBank from "./quizBank";
import activeQuiz from "./activeQuiz";
import history from "./history";

export default combineReducers({
  quizBank,
  history,
  activeQuiz
});
