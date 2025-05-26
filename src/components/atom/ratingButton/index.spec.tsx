import { render, fireEvent, screen } from "@testing-library/react";
import { test, describe, expect, vi } from "vitest";
import { RatingButton } from ".";

describe("RatingButton 테스트", () => {
  test("초기 5개의 하트 버튼이 불러와지는지 테스트", () => {
    const mockSetScore = vi.fn();
    render(<RatingButton score={0} setScore={mockSetScore} />);
    // 정규식을 사용해 해당 문자열이 포함된 모든 test ID 선택
    const heartButtons = screen.getAllByTestId(/HeartButton#/);
    expect(heartButtons).toHaveLength(5);
  });
  test("3번째 하트 클릭 시, 3점으로 점수가 set되는지 테스트", () => {
    const mockSetScore = vi.fn();
    render(<RatingButton score={0} setScore={mockSetScore} />);
    const thirdHeart = screen.getByTestId("HeartButton#3");
    fireEvent.click(thirdHeart);
    expect(mockSetScore).toHaveBeenCalledWith(3);
  });
  test("현재 점수(4점)까지 하트가 채워지는지 테스트트", () => {
    const mockSetScore = vi.fn();
    render(<RatingButton score={4} setScore={mockSetScore} />);
    const filledHearts = screen.getAllByTestId("heart-filled");
    expect(filledHearts).toHaveLength(4);
  });
});
