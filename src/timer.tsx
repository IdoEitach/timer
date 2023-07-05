import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { hover } from "@testing-library/user-event/dist/hover";
import React from "react";
import "./style.css";

type CountdownTimerProps = {
  isPlaying: boolean;
} & Partial<typeof defaultProps>;
const defaultProps = {
  seconds: 60,
  radius: 120,
  strokeColor: "red",
  textColor: "red",
  strokeWidth: 3,
  renderTms: 10,
  units: "s",
};
const styles = {
  countdownContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    margin: "auto",
  },
  svg: {
    transform: "rotateY(-180deg) rotateZ(-90deg)",
    overflow: "visible",
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    position: "absolute",
    top: 0,
    width: "100%",
  } as React.CSSProperties,
  button: {
    fontSize: 16,
    padding: "15px 40px",
    margin: "10px auto 30px",
    display: "block",
    backgroundColor: "#4d4d4d",
    color: "lightgray",
    border: "none",
    cursor: "pointer",
    outline: 0,
    borderRadius: "10px",
  } as React.CSSProperties,
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
        setTimeLeft(Math.max(timeLeft - 10, 0));
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

  const secondsLeft = (timeLeft / 1000).toFixed();

  return (
    <div>
      <div style={{ position: "relative", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={textStyles}>
            {secondsLeft}
            {props.units}
          </p>
        </div>
        <div style={styles.circleContainer}>
          <svg
            style={styles.svg}
            height={props.radius * 2}
            width={props.radius * 2}
          >
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
