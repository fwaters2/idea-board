import React, { ChangeEvent, FocusEvent, KeyboardEvent } from "react";

interface MultiLineEditProps {
  editingValue: string;
  onBlur: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const MultilineEdit = ({
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
