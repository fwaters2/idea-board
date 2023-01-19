import dayjs from "dayjs";
import { SortBy, SortDirection } from "../types";

interface SortableItem {
  title: string;
  created: Date;
}
export const sortBy = (key: SortBy, sortDirection: SortDirection) => {
  const sortFunctions = {
    [SortBy.TITLE]: (a: SortableItem, b: SortableItem) =>
      sortDirection === SortDirection.ASC
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title),
    [SortBy.CREATED]: (a: SortableItem, b: SortableItem) =>
      sortDirection === SortDirection.ASC
        ? dayjs(a.created).diff(dayjs(b.created))
        : dayjs(b.created).diff(dayjs(a.created)),
  };
  return sortFunctions[key];
};
