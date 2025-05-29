import { setupWorker } from "msw/browser";
import { userHandlers } from "./handler/user-handler";
import { detailHandlers } from "./handler/detail-handlers";
export const worker = setupWorker(...userHandlers, ...detailHandlers);
