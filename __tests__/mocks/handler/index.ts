import { http, HttpResponse } from "msw";
import { userFixture } from "../../fixtures/user-fixture";

export const handlers = [
  http.get("https://localhost:3000/user", () => {
    return HttpResponse.json(userFixture);
  }),
];
