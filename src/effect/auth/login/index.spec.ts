import { test, describe, expect } from "vitest";
import { login } from ".";
import { TEST_LOGIN_USER } from "@/constant/test";

describe("login", () => {
  test("should return a user", async () => {
    const response = await login(TEST_LOGIN_USER);
    expect(response).toEqual({ message: "로그인 성공" });
  });
});
