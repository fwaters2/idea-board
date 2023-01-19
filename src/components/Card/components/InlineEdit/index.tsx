import React, { ChangeEvent, FocusEvent, KeyboardEvent, useState } from "react";

interface InlineEditProps {
  value: string;
  setValue: (value: string) => void;
}

export const InlineEdit = ({ value, setValue }: InlineEditProps) => {
  const [editingValue, setEditingValue] = useState(value);

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEditingValue(event.target.value);

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value === value) return;
    setValue(event.target.value);
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
