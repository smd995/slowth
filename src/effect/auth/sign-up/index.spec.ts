import { test, describe, expect } from "vitest";
import { signUp } from ".";
import { TEST_SIGNUP_USER } from "@/constants/test";

describe("sign-up 테스트", () => {
  test("fetch 테스트", async () => {
    const result = await signUp(TEST_SIGNUP_USER);

    const expected = { message: "사용자 생성 성공" };

    expect(result).toEqual(expected);
  });
});
