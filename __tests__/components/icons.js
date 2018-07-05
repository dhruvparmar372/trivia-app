import React from "react";
import renderer from "react-test-renderer";
import { IconBack, IconCorrect, IconWrong } from "source/components/icons";

describe("icons android", () => {
  beforeAll(() => {
    jest.mock("Platform", () => {
      const Platform = require.requireActual("Platform");
      Platform.OS = "android";
      return Platform;
    });
  });

  test("back icon", () => {
    expect(renderer.create(<IconBack size={24} />)).toMatchSnapshot();
  });

  test("correct icon", () => {
    expect(renderer.create(<IconCorrect size={24} />)).toMatchSnapshot();
  });

  test("wrong icon", () => {
    expect(renderer.create(<IconWrong size={24} />)).toMatchSnapshot();
  });
});

describe("icons ios", () => {
  beforeAll(() => {
    jest.mock("Platform", () => {
      const Platform = require.requireActual("Platform");
      Platform.OS = "ios";
      return Platform;
    });
  });

  test("back icon", () => {
    expect(renderer.create(<IconBack size={24} />)).toMatchSnapshot();
  });

  test("correct icon", () => {
    expect(renderer.create(<IconCorrect size={24} />)).toMatchSnapshot();
  });

  test("wrong icon", () => {
    expect(renderer.create(<IconWrong size={24} />)).toMatchSnapshot();
  });
});
