import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Status } from "../../types";
import "./loader.css";
import "./update-notification.css";

const Loader = () => {
  return (
    <div className="spinner">
      <div className="bounce" />
    </div>
  );
};
const GreenCircleWithCheckSvg = () => {
  return (
    <svg
      width="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#00C48C" />
      <path
        d="M8.5 12.5L11 15L16.5 9.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const UpdateNotification = ({ status }: { status: Status }) => {
  const [isVisible, setIsVisible] = useState(false);

  // if status does not equal idle, then show the notification
  useEffect(() => {
    if (status !== Status.IDLE) {
      setIsVisible(true);
    }
  }, [status]);

  // after 2 seconds, the notification will disappear
  useEffect(() => {
    if (status === Status.SUCCESS) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  }, [status]);
  return (
    <div className={`${isVisible ? "visible" : "hidden"}`}>
      {status === Status.SUCCESS ? <GreenCircleWithCheckSvg /> : <Loader />}
    </div>
  );
};
