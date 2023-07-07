import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { hover } from "@testing-library/user-event/dist/hover";
import React from "react";
import "./style.css";

type CountdownTimerProps = {
  seconds: number;
} & Partial<typeof defaultProps>;
const defaultProps = {
  isPlaying: false,
  radius: 120,
  strokeColor: "red",
  textColor: "red",
  strokeWidth: 3,
  renderTms: 10,
  units: "s",
};

function CountdownTimer(propsIn: CountdownTimerProps) {
  const props = { ...defaultProps, ...propsIn };
  const [timeLeft, setTimeLeft] = useState(props.seconds * 1000);
  const [circumference, setCircumference] = useState(
    2 * props.radius * Math.PI
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.isPlaying) {
        setTimeLeft(Math.max(timeLeft - props.renderTms, 0));
      }
    }, props.renderTms);

    return () => clearTimeout(timer);
  }, [timeLeft, props.isPlaying, props.seconds]);

  const strokeDashoffset = function (): number {
    return circumference - (timeLeft / (props.seconds * 1000)) * circumference;
  };

  const countdownSizeStyles = {
    height: props.radius,
    width: props.radius,
  };
  const textStyles = {
    color: props.textColor,
    fontSize: props.radius * 2 * 0.3,
  };

  const unitsLeft = (timeLeft / 1000).toFixed();

  return (
    <div>
      <div id="wrapEvrything" className="center">
        <div id="unitsLeftWarper" className="center">
          <p style={textStyles}>
            {unitsLeft}
            {props.units}
          </p>
        </div>
        <div id="circleWarper">
          <svg id="svg" height={props.radius * 2} width={props.radius * 2}>
            <circle
              strokeDasharray={circumference}
              strokeDashoffset={props.isPlaying ? strokeDashoffset() : 0}
              r={props.radius}
              cx={props.radius}
              cy={props.radius}
              fill="none"
              stroke={props.strokeColor}
              strokeLinecap="round"
              strokeWidth={props.strokeWidth}
            ></circle>
          </svg>
        </div>
      </div>
    </div>
  );
}
export default CountdownTimer;
