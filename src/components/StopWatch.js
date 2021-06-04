import React from 'react';

function StopWatch(props) {

  const displayTime = (count) => {
    const addZero = (value) => (value < 10 ? '0' : '') + value;
    const seconds = count % 60;
    const fullMinutes = (count - seconds) / 60;
    const minutes = fullMinutes % 60;
    const hours = (fullMinutes - minutes) / 60;

    return `${
      addZero(hours)}:${
      addZero(minutes)}:${
      addZero(seconds)}`;
  };

  return (
    <span className={props.className}>
      {displayTime(props.timeCounter)}
    </span>
  );
}

export default StopWatch;