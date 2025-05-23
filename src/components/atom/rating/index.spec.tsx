import { render, screen } from "@testing-library/react";
import { test, describe, expect } from "vitest";
import { Rating } from ".";

describe("Rating 테스트", () => {
  test("3점일 경우 하트 5개 중 3개가 채워지는지 테스트", () => {
    render(<Rating score={3} />);

    const hearts = screen.getAllByTestId("HeartIcon");
    expect(hearts).toHaveLength(5);
  });
});
