import React, { useEffect, useRef } from "react";
import { Idea, SortKey } from "../types";

export const useScrollToTopOnSort = (sortKey: SortKey, ideas: Idea[]) => {
  // scroll to top when card is added or sortkey is changed
  const bodyRef = useRef<HTMLElement>(null);
  // previous idea count
  const prevIdeaCount = useRef(0);
  const prevSortKey = useRef("created");

  useEffect(() => {
    if (
      bodyRef.current &&
      (prevIdeaCount.current < ideas.length || prevSortKey.current !== sortKey)
    ) {
      bodyRef.current.scrollTop = 0;
    }
    prevIdeaCount.current = ideas.length;
    prevSortKey.current = sortKey;
  }, [sortKey, ideas]);

  return bodyRef;
};
