import dayjs from "dayjs";
import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { MAX_CHARACTER_COUNT } from "../../constants";
import { Idea, Status } from "../../types";
import { UpdateNotification } from "../UpdateNotification";
import "./card.css";

interface InlineEditProps {
  value: string;
  setValue: (value: string) => void;
}

const InlineEdit = ({ value, setValue }: InlineEditProps) => {
  const [editingValue, setEditingValue] = useState(value);

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEditingValue(event.target.value);

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    // If the value has changed, update the card
    if (event.target.value !== value) {
      setValue(event.target.value);
    }
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.currentTarget.blur();
    }
  };

  return (
    <input
      autoFocus
      type="text"
      aria-label="Title"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};

interface MultiLineEditProps {
  editingValue: string;
  onBlur: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const MultilineEdit = ({
  editingValue,
  onBlur,
  onChange,
  onKeyDown,
}: MultiLineEditProps) => {
  return (
    <textarea
      aria-label="Description"
      value={editingValue}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

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
    // If the value hasn't changed, do nothing
    if (event.target.value === description) return;
    const tooManyCharacters = event.target.value.length > MAX_CHARACTER_COUNT;
    if (event.target.value.trim() === "" || tooManyCharacters) {
      setEditingValue(description);
    } else {
      onUpdate({ key: "description", value: event.target.value });
    }
  };

  return (
    <div className="card">
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
    </div>
  );
};
