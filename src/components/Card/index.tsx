import React, { KeyboardEvent, useCallback, useState } from "react";
import { MAX_CHARACTER_COUNT } from "../../constants";
import { Idea, Status } from "../../types";
import { Card as CardView } from "./Card";

interface CardProps {
  idea: Idea;
  handleDeleteCard: (cardId: string) => void;
  handleUpdateCard: (cardId: string, updatedCard: Idea) => void;
}

export const Card = (props: CardProps) => {
  const { idea, handleDeleteCard, handleUpdateCard } = props;
  const { id, title, description, created, updated } = idea;
  const [editingTitleValue, setEditingTitleValue] = useState(title);
  const [editingDescriptionValue, setEditingDescriptionValue] =
    useState(description);
  const [status, setStatus] = useState<Status>("idle");
  const charactersRemaining =
    MAX_CHARACTER_COUNT - editingDescriptionValue.length;
  const noCharactersRemaining = charactersRemaining <= 0;

  const onUpdate = useCallback(
    async ({ key, value }: { key: keyof Idea; value: Idea[keyof Idea] }) => {
      setStatus("loading");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        handleUpdateCard(id, {
          ...idea,
          [key]: value,
          updated: new Date(),
        });
        setStatus("success");
      } catch (e) {
        console.error(e);
      }
    },
    [handleUpdateCard, id, idea]
  );

  const onTitleChange = (newTitle: string) => setEditingTitleValue(newTitle);

  const onDescriptionChange = (newDescription: string) => {
    const charactersRemoved =
      newDescription.length < editingDescriptionValue.length;
    if (charactersRemoved || !noCharactersRemaining) {
      setEditingDescriptionValue(newDescription);
    }
  };

  const onTitleBlur = (newTitle: string) => {
    if (newTitle === title) return;
    onUpdate({ key: "title", value: newTitle });
  };

  const onDescriptionBlur = (newDescription: string) => {
    if (newDescription === description) return;
    const tooManyCharacters = newDescription.length > MAX_CHARACTER_COUNT;
    if (newDescription.trim() === "" || tooManyCharacters) {
      setEditingDescriptionValue(description);
    } else {
      onUpdate({ key: "description", value: newDescription });
    }
  };

  const onKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.currentTarget.blur();
    }
  };

  return (
    <CardView
      id={id}
      status={status}
      title={editingTitleValue}
      description={editingDescriptionValue}
      charactersRemaining={charactersRemaining}
      created={created}
      updated={updated}
      onTitleChange={onTitleChange}
      onDescriptionChange={onDescriptionChange}
      onTitleBlur={onTitleBlur}
      onDescriptionBlur={onDescriptionBlur}
      onKeyDown={onKeyDown}
      handleDeleteCard={handleDeleteCard}
    />
  );
};
