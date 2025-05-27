import { setupWorker } from "msw/browser";
import { handlers } from "./handler/msw-example-handler";
import { userHandlers } from "./handler/user-handler";
import { detailHandlers } from "./handler/detail-handlers";
export const worker = setupWorker(
  ...handlers,
  ...userHandlers,
  ...detailHandlers,
);
