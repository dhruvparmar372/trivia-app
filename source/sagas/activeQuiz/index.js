import { all, fork } from "redux-saga/effects";
import activeQuizTimer from "./activeQuizTimer";

export default function*() {
  yield all([activeQuizTimer].map(fork));
}
