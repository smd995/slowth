import { test, describe, expect, beforeEach, vi, afterEach } from "vitest";
import { isPastNow } from "./isPastNow";

describe("isPastNow 테스트", () => {
  beforeEach(() => {
    // 현재 시간을 2025-06-19 12:00:00으로 고정
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-19T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("과거 날짜는 true를 반환해야 한다", () => {
    const pastDate = "2025-05-30T14:36:06.675Z";
    expect(isPastNow(pastDate)).toBe(true);
  });

  test("미래 날짜는 false를 반환해야 한다", () => {
    const futureDate = "2025-07-01T10:00:00.000Z";
    expect(isPastNow(futureDate)).toBe(false);
  });

  test("현재 시간보다 몇 분 전은 true를 반환해야 한다", () => {
    const pastTime = "2025-06-19T11:30:00.000Z";
    expect(isPastNow(pastTime)).toBe(true);
  });

  test("현재 시간보다 몇 분 후는 false를 반환해야 한다", () => {
    const futureTime = "2025-06-19T12:30:00.000Z";
    expect(isPastNow(futureTime)).toBe(false);
  });

  test("현재 시간과 정확히 같은 시간은 false를 반환해야 한다", () => {
    const currentTime = "2025-06-19T12:00:00.000Z";
    expect(isPastNow(currentTime)).toBe(false);
  });

  test("빈 문자열 입력시 false를 반환해야 한다", () => {
    expect(isPastNow("")).toBe(false);
  });
});
