import { test, describe, expect } from "vitest";
import { signUp } from ".";

const data = {
  email: "Kuhlman@gmail.com",
  password: "test123",
  name: "Reinhold",
  companyName: "Lakin, Windler and Kautzer",
};

describe("sign-up 테스트", () => {
  test("fetch 테스트", async () => {
    const result = await signUp(data);

    const expected = { message: "사용자 생성 성공" };

    expect(result).toEqual(expected);
  });
});
