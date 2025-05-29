import { setupServer } from "msw/node";
import { userHandlers } from "./handler/user-handler";
import { detailHandlers } from "./handler/detail-handlers";
export const server = setupServer(...userHandlers, ...detailHandlers);
