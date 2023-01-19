import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from "react";
import dayjs from "dayjs";
import { MAX_CHARACTER_COUNT } from "../../constants";
import { Idea, Status } from "../../types";
import { UpdateNotification } from "../UpdateNotification";
import "./card.css";
import { InlineEdit } from "./components/InlineEdit";
import { MultilineEdit } from "./components/MultilineEdit";

interface CardProps {
  idea: Idea;
  handleDeleteCard: (cardId: string) => void;
  handleUpdateCard: (cardId: string, updatedCard: Idea) => void;
}

export const Card = (props: CardProps) => {
  const { idea, handleDeleteCard, handleUpdateCard } = props;
  const { id, title, description, created, updated } = idea;
  const [editingValue, setEditingValue] = useState(description);
  const [status, setStatus] = useState(Status.IDLE);
  const charactersRemaining = MAX_CHARACTER_COUNT - editingValue.length;
  const noCharactersRemaining = charactersRemaining <= 0;

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const charactersRemoved =
      event.currentTarget.value.length < editingValue.length;
    if (charactersRemoved || !noCharactersRemaining) {
      setEditingValue(event.target.value);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.currentTarget.blur();
    }
  };

  const onUpdate = useCallback(
    ({ key, value }: { key: keyof Idea; value: Idea[keyof Idea] }) => {
      setStatus(Status.LOADING);
      setTimeout(() => {
        handleUpdateCard(id, {
          ...idea,
          [key]: value,
          updated: new Date(),
        });
        setStatus(Status.SUCCESS);
      }, 1000);
    },
    [handleUpdateCard, id, idea]
  );

  const onBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    if (event.target.value === description) return;
    const tooManyCharacters = event.target.value.length > MAX_CHARACTER_COUNT;
    if (event.target.value.trim() === "" || tooManyCharacters) {
      setEditingValue(description);
    } else {
      onUpdate({ key: "description", value: event.target.value });
    }
  };

  return (
    <li className="card">
      <div className="card__header">
        <div style={{ flex: 1 }}>
          <InlineEdit
            value={title}
            setValue={(newValue: string) => {
              onUpdate({ key: "title", value: newValue });
            }}
          />
          <div className="card__subheader_container">
            {updated && (
              <p className="card__updated timestamp">{`updated ${dayjs(
                updated
              ).fromNow()}`}</p>
            )}
            <div className="card__status_indicator">
              <UpdateNotification status={status} />
            </div>
          </div>
        </div>
        <button
          className="card__delete_btn"
          onClick={() => {
            handleDeleteCard(id);
          }}
        >
          X
        </button>
      </div>
      <MultilineEdit
        editingValue={editingValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      <div className="card__footer">
        {charactersRemaining < 20 && (
          <p
            className={`card__character_count ${
              noCharactersRemaining ? "error" : ""
            }`}
          >{`${charactersRemaining} characters remaining`}</p>
        )}
        <p className="card__created timestamp">{`created ${dayjs(
          created
        ).fromNow()}`}</p>
      </div>
    </li>
  );
};
