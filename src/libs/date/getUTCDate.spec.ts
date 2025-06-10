import { test, describe, expect } from "vitest";
import { getUTCDate } from "./getUTCDate";

describe("getUTCDate", () => {
  test("should return UTC date", () => {
    const localizedDate = "2025-06-10T09:31";
    const formattedDate = getUTCDate(localizedDate);
    expect(formattedDate).toBe("2025-06-10T00:31:00Z");
  });
});
