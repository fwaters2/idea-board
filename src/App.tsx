import React, { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import "./App.css";
import relativeTime from "dayjs/plugin/relativeTime";
import { Idea, SortBy, SortDirection } from "./types";
import { Cards } from "./components/Cards";
import { sortBy } from "./utils";
import { Card } from "./components/Card";
import { Layout } from "./components/Layout";
import { Controls } from "./components/Controls";
import { DebugControls } from "./components/Controls/DebugControls";
import { EmptyPlaceholder } from "./components/EmptyPlaceholder";
import { NewCardBtn } from "./components/NewCardBtn";

dayjs.extend(relativeTime);

export const App = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [sortKey, setSortKey] = useState<SortBy>(SortBy.CREATED);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.DESC
  );

  // scroll to top when card is added or sortkey is changed
  const bodyRef = useRef<HTMLElement>(null);
  // previous idea count
  const prevIdeaCount = useRef(0);
  const prevSortKey = useRef(SortBy.CREATED);
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
    const cards = localStorage.getItem("cards");
    if (cards) {
      setIdeas(JSON.parse(cards));
    }
  }, []);

  const handleDeleteCard = (cardId: string) => {
    const newCards = ideas.filter((card) => card.id !== cardId);
    setIdeas(newCards);
    localStorage.setItem("cards", JSON.stringify(newCards));
  };
  const handleAddCard = () => {
    const newId = uuid().toString();
    const newCard = {
      id: newId,
      title: "New Idea",
      description: "Click me to add a description",
      created: new Date(),
    };
    const newCards = [newCard, ...ideas];
    setIdeas(newCards);
    localStorage.setItem("cards", JSON.stringify(newCards));
    // reset sortkey and direction
    setSortDirection(SortDirection.DESC);
    setSortKey(SortBy.CREATED);
  };

  const handleUpdateCard = (cardId: string, updatedCard: Idea) => {
    // using local storage as state maybe stale
    const cards = localStorage.getItem("cards");
    let newCards = [];
    if (cards) {
      const localStorageIdeas = JSON.parse(cards) as Idea[];

      newCards = localStorageIdeas.map((idea) => {
        if (idea.id === cardId) {
          return {
            ...idea,
            ...updatedCard,
            updated: new Date(),
          };
        }
        return idea;
      });
    } else {
      newCards = ideas.map((idea) => {
        if (idea.id === cardId) {
          return {
            ...idea,
            ...updatedCard,
            updated: new Date(),
          };
        }
        return idea;
      });
    }
    setIdeas(newCards);
    localStorage.setItem("cards", JSON.stringify(newCards));
  };

  const sortedIdeas = useMemo(
    () => ideas.sort(sortBy(sortKey, sortDirection)),
    [ideas, sortKey, sortDirection]
  );

  const onClickSort = (key: SortBy) => {
    setSortKey(key);
    setSortDirection(
      sortDirection === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC
    );
  };

  return (
    <Layout>
      <Layout.Header>
        <div style={{ display: "flex" }}>
          <h1 style={{ flex: 1 }}>Idea Board</h1>
          <DebugControls setIdeas={setIdeas} />
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
