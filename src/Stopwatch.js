
import React, { useState, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!running) {
      setRunning(true);
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
  };

  const pauseTimer = () => {
    if (running) {
      clearInterval(timerRef.current);
      setRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lapTimer = () => {
    if (running) {
      setLaps([...laps, time]);
    }
  };

  const formatTime = (time) => {
    const milliseconds = `00${time % 1000}`.slice(-3);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);

    return `${minutes} : ${seconds} : ${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="timer">
        {formatTime(time)}
      </div>
      <div className="buttons">
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={lapTimer}>Lap</button>
      </div>
      <div className="laps">
        <h2>Laps</h2>
        {laps.map((lap, index) => (
          <div key={index}>
            Lap {index + 1}: {formatTime(lap)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;
