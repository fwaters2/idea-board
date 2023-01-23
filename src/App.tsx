import React, { useEffect, useMemo, useReducer, useRef } from "react";
import dayjs from "dayjs";
import "./App.css";
import relativeTime from "dayjs/plugin/relativeTime";
import { Idea, SortKey } from "./types";
import { Cards } from "./components/Cards";
import { sortBy } from "./utils";
import { Card } from "./components/Card";
import { Layout } from "./components/Layout";
import { Controls } from "./components/Controls";
import { EmptyPlaceholder } from "./components/EmptyPlaceholder";
import { NewCardBtn } from "./components/NewCardBtn";
import { ActionKind, appReducer } from "./AppReducer";
import { initialState } from "./constants";

dayjs.extend(relativeTime);

export const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { ideas, sortKey, sortDirection } = state;

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

  useEffect(() => {
    dispatch({ type: ActionKind.FETCH_IDEAS });
  }, []);

  const handleDeleteCard = (cardId: string) => {
    dispatch({ type: ActionKind.DELETE_IDEA, payload: { cardId } });
  };
  const handleAddCard = () => {
    dispatch({ type: ActionKind.CREATE_IDEA });
  };

  const handleUpdateCard = (cardId: string, updatedIdea: Partial<Idea>) => {
    dispatch({
      type: ActionKind.UPDATE_IDEA,
      payload: { cardId, updatedIdea },
    });
  };

  const sortedIdeas = useMemo(
    () => ideas.sort(sortBy(sortKey, sortDirection)),
    [ideas, sortKey, sortDirection]
  );

  const onClickSort = (sortKey: SortKey) => {
    dispatch({ type: ActionKind.SET_SORT_KEY, payload: { sortKey } });
  };

  return (
    <Layout>
      <Layout.Header>
        <div style={{ display: "flex" }}>
          <h1 style={{ flex: 1 }}>Idea Board</h1>
          {/* <DebugControls setIdeas={setIdeas} /> */}
        </div>
        <Controls
          sortKey={sortKey}
          sortDirection={sortDirection}
          onClickSort={onClickSort}
          handleAddCard={handleAddCard}
        />
      </Layout.Header>
      <Layout.Body ref={bodyRef}>
        {sortedIdeas?.length >= 1 ? (
          <Cards>
            {sortedIdeas.map((idea) => (
              <Card
                key={idea.id}
                idea={idea}
                handleDeleteCard={handleDeleteCard}
                handleUpdateCard={handleUpdateCard}
              />
            ))}
          </Cards>
        ) : (
          <EmptyPlaceholder>
            <h2>Start by adding a card</h2>
            <NewCardBtn handleAddCard={handleAddCard} />
          </EmptyPlaceholder>
        )}
      </Layout.Body>
    </Layout>
  );
};
