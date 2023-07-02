import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Timer from "./timer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Timer
    seconds={30}
    strokeColor="red"
    strokeWidth={3}
    renderTms={10}
    isPlaying={true}
  />
);
