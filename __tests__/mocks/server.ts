import { setupServer } from "msw/node";
import { handlers } from "./handler/msw-example-handler";
import { userHandlers } from "./handler/user-handler";

export const server = setupServer(...handlers, ...userHandlers);
