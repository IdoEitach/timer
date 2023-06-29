import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { hover } from "@testing-library/user-event/dist/hover";
import React from 'react';
import  "./style.css";

type Atributts = {
    seconds: number;
    size: number;
    strokeBgColor: string;
    strokeColor: string;
    textColor:string;
    strokeWidth: number;
    opacityAfterClick:number;
  };
  
  type State = {
    countdown: number;
    isPlaying: boolean;
  };
  
  class CountdownTimer extends React.Component<Atributts, State> {
    milliseconds: number;
    radius: number;
    circumference: number;
    strokeDashoffset: () => number;
  
    constructor(atributts: Atributts) {
      super(atributts);
  
      this.milliseconds = this.props.seconds * 1000;
      this.radius = this.props.size / 2;
      this.circumference = this.props.size * Math.PI;
  
      this.state = {
        countdown: this.milliseconds,
        isPlaying: false,
      };
  
      this.strokeDashoffset = () =>
        this.circumference - (this.state.countdown / this.milliseconds) * this.circumference;
    }
  
    startTimer = () => {
      this.setState({ isPlaying: true });
  
      const interval = setInterval(() => {
        this.setState({ countdown: this.state.countdown - 10 });
  
        if (this.state.countdown === 0) {
          clearInterval(interval);
          this.setState({
            countdown: this.milliseconds,
            isPlaying: false,
          });
        }
      }, 10);
    };
  
    render() {
      const countdownSizeStyles = {
        height: this.props.size,
        width: this.props.size,
      };
      const textStyles = {
        color: this.props.textColor,
        fontSize: this.props.size * 0.3,
      };
  
      const seconds = (this.state.countdown / 1000).toFixed();
  
      return (
        <div>
          <div
            style={{pointerEvents: this.state.isPlaying ? "none" : "all",opacity: this.state.isPlaying ? this.props.opacityAfterClick : 1,}}>
            <button onClick={!this.state.isPlaying ? this.startTimer : () => {}} style={styles.button}>
              START
            </button>
          </div>
          <div style={{position:"relative",alignItems:"center"  }}>
            <div style={{display:"flex" , alignItems:"center" , justifyContent:"center" }}>
            <p style={textStyles}>{seconds}s</p>
            </div>
            <div style={styles.circleContainer}>
              <svg style={styles.svg} height={this.radius*2} width={this.radius*2}>
                <circle
                  strokeDasharray={this.circumference}
                  strokeDashoffset={this.state.isPlaying ? this.strokeDashoffset() : 0}
                  r={this.radius}
                  cx={this.radius}
                  cy={this.radius}
                  fill="none"
                  strokeLinecap="round"
                  stroke={this.props.strokeColor}
                  strokeWidth={this.props.strokeWidth}
                ></circle>
              </svg>
            </div>
          </div>
        </div>
      );
    }
  }
  
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
      alignItems:"center",
      display: "flex",
      position:"absolute",
      top:0,
      width:"100%",
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
    borderRadius:"10px",
  } as React.CSSProperties,
  };
  export default CountdownTimer;    