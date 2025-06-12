export interface SortOption {
  label: string;
  value: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface Filters {
  region: string;
  date: Date | null;
  sort: SortOption;
}
