export interface Idea {
  id: string;
  title: string;
  description: string;
  created: Date;
  updated?: Date;
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export enum SortBy {
  CREATED = "CREATED",
  TITLE = "TITLE",
}

export enum Status {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  IDLE = "IDLE",
  LOADING = "LOADING",
}
