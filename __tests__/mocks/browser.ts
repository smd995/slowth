import { setupWorker } from "msw/browser";
import { handlers } from "./handler/msw-example-handler";
import { userHandlers } from "./handler/user-handler";

export const worker = setupWorker(...handlers, ...userHandlers);
