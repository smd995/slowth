import { test, describe, expect } from "vitest";
import { fetchUser } from ".";

describe("fetchUser 테스트", () => {
  test("fetch 테스트", async () => {
    const data = await fetchUser();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("email");
    expect(data[0]).toHaveProperty("name");
    expect(data[0]).toHaveProperty("companyName");
    expect(data[0]).toHaveProperty("image");
  });
});
