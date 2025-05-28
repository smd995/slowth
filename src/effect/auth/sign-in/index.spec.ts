import { TEST_LOGIN_USER } from "@/constants/test";
import { test, describe, expect } from "vitest";
import { login } from ".";

describe("login", () => {
  test("should return a user", async () => {
    const response = await login(TEST_LOGIN_USER);
    expect(response).toHaveProperty("token");
  });
});
