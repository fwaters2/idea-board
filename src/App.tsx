import React, { useEffect, useMemo, useReducer } from "react";
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
import { appReducer } from "./AppReducer";
import { initialState } from "./constants";
import { useScrollToTopOnSort } from "./hooks/useScrollToTopOnSort";

dayjs.extend(relativeTime);

export const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { ideas, sortKey, sortDirection } = state;

  const bodyRef = useScrollToTopOnSort(sortKey, ideas);

  // fetch ideas on initial render
  useEffect(() => {
    dispatch({ type: "FETCH_IDEAS" });
  }, []);

  const handleAddCard = () => {
    dispatch({ type: "CREATE_IDEA" });
  };

  const handleUpdateCard = (cardId: string, updatedIdea: Partial<Idea>) => {
    dispatch({
      type: "UPDATE_IDEA",
      cardId,
      updatedIdea,
    });
  };

  const handleDeleteCard = (cardId: string) => {
    dispatch({ type: "DELETE_IDEA", cardId });
  };

  const sortedIdeas = useMemo(
    () => ideas.sort(sortBy(sortKey, sortDirection)),
    [ideas, sortKey, sortDirection]
  );

  const onClickSort = (sortKey: SortKey) => {
    dispatch({ type: "SET_SORT_KEY", sortKey });
  };

  return (
    <Layout>
      <Layout.Header>
        <div style={{ display: "flex" }}>
          <h1 style={{ flex: 1 }}>Idea Board</h1>
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
