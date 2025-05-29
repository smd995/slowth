import { test, describe, expect } from "vitest";
import { fetchUser } from ".";

describe("fetchUser 테스트", () => {
  test("fetch 테스트", async () => {
    const data = await fetchUser();

    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("email");
    expect(data).toHaveProperty("name");
    expect(data).toHaveProperty("companyName");
    expect(data).toHaveProperty("image");
  });
});
