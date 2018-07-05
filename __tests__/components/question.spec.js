import React from "react";
import renderer from "react-test-renderer";
import Question from "source/components/question";

const dummyQuestion = {
  id: 1,
  category: "Test",
  question: "Roses are only red&quot;",
  correct_answer: "False",
  incorrect_answers: ["True"]
};

describe("question component", () => {
  test("renders question", () => {
    expect(
      renderer.create(
        <Question
          question={dummyQuestion}
          ignoreAnswerShuffle
          onAnswer={jest.fn}
        />
      )
    ).toMatchSnapshot();
  });
});
