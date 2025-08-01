import { DEFAULT_REGION } from "./region";
import { mainSortOptions } from "./sort-options";
import { type Filters } from "@/entity/filters";

// Filters 초기 상태
export const DEFAULT_FILTERS: Filters = {
  region: DEFAULT_REGION,
  date: null,
  sort: mainSortOptions[0], // 마감 임박 기준
};
