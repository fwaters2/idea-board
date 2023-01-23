import dayjs from "dayjs";
import { SortKey, SortDirection } from "../types";

interface SortableItem {
  title: string;
  created: Date;
}
export const sortBy = (key: SortKey, sortDirection: SortDirection) => {
  const sortFunctions = {
    title: (a: SortableItem, b: SortableItem) =>
      sortDirection === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title),
    created: (a: SortableItem, b: SortableItem) =>
      sortDirection === "asc"
        ? dayjs(a.created).diff(dayjs(b.created))
        : dayjs(b.created).diff(dayjs(a.created)),
  };
  return sortFunctions[key];
};
