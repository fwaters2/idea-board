import React from "react";
import "./new-card-btn.css";

export const NewCardBtn = ({
  handleAddCard,
}: {
  handleAddCard: () => void;
}) => {
  return (
    <button
      className="new_card_btn"
      onClick={() => {
        handleAddCard();
      }}
    >
      +
    </button>
  );
};
