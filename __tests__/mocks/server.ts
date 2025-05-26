import { setupServer } from "msw/node";
import { handlers } from "./handler/msw-example-handler";
import { userHandlers } from "./handler/user-handler";
import { detailHandlers } from "./handler/detail-handlers";
export const server = setupServer(
  ...handlers,
  ...userHandlers,
  ...detailHandlers,
);
