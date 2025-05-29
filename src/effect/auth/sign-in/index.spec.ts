import { TEST_LOGIN_USER } from "@/constants/test";
import { signIn } from ".";
import { test, describe, expect } from "vitest";

describe("signIn", () => {
  test("should return a user", async () => {
    const response = await signIn(TEST_LOGIN_USER);
    expect(response).toHaveProperty("token");
  });
});
