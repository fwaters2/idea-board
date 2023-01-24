import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from "react";
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
    ({ key, value }: { key: keyof Idea; value: Idea[keyof Idea] }) => {
      setStatus("loading");
      setTimeout(() => {
        handleUpdateCard(id, {
          ...idea,
          [key]: value,
          updated: new Date(),
        });
        setStatus("success");
      }, 1000);
    },
    [handleUpdateCard, id, idea]
  );

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEditingTitleValue(event.target.value);

  const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const charactersRemoved =
      event.currentTarget.value.length < editingDescriptionValue.length;
    if (charactersRemoved || !noCharactersRemaining) {
      setEditingDescriptionValue(event.target.value);
    }
  };

  const onTitleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value === title) return;
    onUpdate({ key: "title", value: event.target.value });
  };

  const onDescriptionBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    if (event.target.value === description) return;
    const tooManyCharacters = event.target.value.length > MAX_CHARACTER_COUNT;
    if (event.target.value.trim() === "" || tooManyCharacters) {
      setEditingDescriptionValue(description);
    } else {
      onUpdate({ key: "description", value: event.target.value });
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
