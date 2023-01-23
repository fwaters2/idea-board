export interface Idea {
  id: string;
  title: string;
  description: string;
  created: Date;
  updated?: Date;
}

export interface AppState {
  ideas: Idea[];
  sortKey: SortKey;
  sortDirection: SortDirection;
}

export type SortDirection = "asc" | "desc";

export type SortKey = "created" | "title";

export type Status = "success" | "error" | "idle" | "loading";
