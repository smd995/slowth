import { http, HttpResponse } from "msw";
import { exampleFixtures } from "../../fixtures/example-fixture";

export const handlers = [
  http.get("https://localhost:3000/user", () => {
    return HttpResponse.json(exampleFixtures);
  }),
];
