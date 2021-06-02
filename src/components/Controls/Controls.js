import React from 'react';
import Button from '../Button/Button';
import StopWatch from '../StopWatch';
import './Controls.css';

function Controls(props) {

  const handleStartClick = () => {
    props.onStartGame();
  };

  const handleStopClick = () => {
    props.onStopGame();
  };

  return(
    <nav className="controls">
      <Button
        userClass="controls__btn"
        disabled={props.isGameOn}
        onClick={handleStartClick}
      >
        Start
      </Button>

      <Button
        userClass="controls__btn"
        disabled={!props.isGameOn}
        onClick={handleStopClick}
      >
        Stop
      </Button>

      <div className="controls__time-container">
        <StopWatch
          className="controls__time"
          timeCounter={props.timeCounter}
        />
      </div>
    </nav>
  );
}

export default Controls;