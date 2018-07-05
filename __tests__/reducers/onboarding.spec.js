import { recordAnswer as recordAnswerAction } from "source/actions/activeQuiz";
import onboardingReducer, { initialState } from "source/reducers/onboarding";

describe("onboarding reducer", () => {
  test("saves first time user answers a question", () => {
    expect(
      onboardingReducer(initialState, recordAnswerAction())
    ).toMatchSnapshot();
  });
});
