import React from "react";
import "./empty-placeholder.css";

export const EmptyPlaceholder = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="empty-placeholder">{children}</div>;
};
