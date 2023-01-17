import React from "react";
import { SortBy, SortDirection } from "../../types";
import { NewCardBtn } from "../NewCardBtn";
import "./controls.css";

interface ControlsProps {
  handleAddCard: () => void;
  onClickSort: (sortBy: SortBy) => void;
  sortDirection: SortDirection;
  sortKey: SortBy;
}

export const Controls = (props: ControlsProps) => {
  const { handleAddCard, onClickSort, sortDirection, sortKey } = props;
  const getSortDirectionIcon = (key: SortBy, sortDirection: SortDirection) => {
    if (key === sortKey) {
      return sortDirection === SortDirection.ASC ? "↓" : "↑";
    }
    return "⇅";
  };
  return (
    <div className="controls-container">
      <NewCardBtn handleAddCard={handleAddCard} />
      <button
        className="control_btn"
        onClick={() => {
          onClickSort(SortBy.CREATED);
        }}
      >
        <span>{getSortDirectionIcon(SortBy.CREATED, sortDirection)}</span>
        <span>Created</span>
      </button>
      <button
        className="control_btn"
        onClick={() => {
          onClickSort(SortBy.TITLE);
        }}
      >
        <span>{getSortDirectionIcon(SortBy.TITLE, sortDirection)}</span>
        <span>Title</span>
      </button>
    </div>
  );
};
