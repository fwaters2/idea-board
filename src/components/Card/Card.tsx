import React, { KeyboardEvent } from "react";
import dayjs from "dayjs";
import { Status } from "../../types";
import { UpdateNotification } from "../UpdateNotification";
import "./card.css";

interface CardProps {
  id: string;
  status: Status;
  title: string;
  description: string;
  charactersRemaining: number;
  created: Date;
  updated?: Date;
  handleDeleteCard: (cardId: string) => void;
  onTitleChange: (newTitle: string) => void;
  onDescriptionChange: (newDescription: string) => void;
  onTitleBlur: (newTitle: string) => void;
  onDescriptionBlur: (newDescription: string) => void;
  onKeyDown: (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const Card = ({
  id,
  status,
  title,
  description,
  charactersRemaining,
  created,
  updated,
  handleDeleteCard,
  onTitleChange,
  onDescriptionChange,
  onTitleBlur,
  onDescriptionBlur,
  onKeyDown,
}: CardProps) => {
  return (
    <div className="card">
      <div className="card__header">
        <div style={{ flex: 1 }}>
          <input
            autoFocus
            aria-label="Title"
            value={title}
            onChange={(e) => onTitleChange(e.currentTarget.value)}
            onKeyDown={onKeyDown}
            onBlur={(e) => onTitleBlur(e.currentTarget.value)}
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
      <textarea
        aria-label="Description"
        value={description}
        onBlur={(e) => onDescriptionBlur(e.currentTarget.value)}
        onChange={(e) => onDescriptionChange(e.currentTarget.value)}
        onKeyDown={onKeyDown}
      />
      <div className="card__footer">
        {charactersRemaining < 20 && (
          <p
            className={`card__character_count ${
              charactersRemaining <= 0 ? "error" : ""
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
