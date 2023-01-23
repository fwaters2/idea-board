import React from "react";
import { SortKey, SortDirection } from "../../types";
import { NewCardBtn } from "../NewCardBtn";
import "./controls.css";

interface ControlsProps {
  handleAddCard: () => void;
  onClickSort: (sortBy: SortKey) => void;
  sortDirection: SortDirection;
  sortKey: SortKey;
}

export const Controls = (props: ControlsProps) => {
  const { handleAddCard, onClickSort, sortDirection, sortKey } = props;
  const getSortDirectionIcon = (key: SortKey, sortDirection: SortDirection) => {
    if (key === sortKey) {
      return sortDirection === "asc" ? "↓" : "↑";
    }
    return "⇅";
  };
  return (
    <div className="controls-container">
      <NewCardBtn handleAddCard={handleAddCard} />
      <button
        className="control_btn"
        onClick={() => {
          onClickSort("created");
        }}
      >
        <span>{getSortDirectionIcon("created", sortDirection)}</span>
        <span>Created</span>
      </button>
      <button
        className="control_btn"
        onClick={() => {
          onClickSort("title");
        }}
      >
        <span>{getSortDirectionIcon("title", sortDirection)}</span>
        <span>Title</span>
      </button>
    </div>
  );
};
