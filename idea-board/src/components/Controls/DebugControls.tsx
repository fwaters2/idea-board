import React from "react";
import { useEffect } from "react";
import { dummy_card_data } from "../../constants";
import "./debug-controls.css";

interface DebugControlsProps {
  setIdeas: (ideas: any[]) => void;
}

export const DebugControls = (props: DebugControlsProps) => {
  const { setIdeas } = props;

  // implements hotkey functionality to toggle debug controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "d" && e.ctrlKey) {
        const debugControls = document.getElementById("debug-controls");
        const debugPlaceholder = document.querySelector(".debug-placeholder");

        if (debugControls && debugPlaceholder) {
          debugControls.classList.toggle("hidden");
          debugPlaceholder.classList.toggle("hidden");
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div>
      {/* debug controls icon with tooltip */}
      <div className="debug-placeholder tooltip-container">
        <span className="tooltip-text">
          <div className="kbd-container">
            <span className="kbd">ctrl</span>
            <span>+</span>
            <span className="kbd">d</span>
          </div>
          <div style={{ fontSize: 10, marginTop: 4 }}>
            Toggle debug controls
          </div>
        </span>
        <span className="tooltip-icon">!</span>
      </div>

      {/* debug controls */}
      <div id="debug-controls" className="hidden">
        <button
          onClick={() => {
            localStorage.setItem("cards", JSON.stringify(dummy_card_data));
            setIdeas(dummy_card_data);
          }}
        >
          Add dummy data
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("cards");
            setIdeas([]);
          }}
        >
          Clear data
        </button>
      </div>
    </div>
  );
};
