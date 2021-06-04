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

  const handleResultsClick = () => {
    props.onResultsClick();
  };

  return(
    <nav className="controls">
      <div className="controls__btn-container">
        <Button
          userClass="controls__btn controls__btn_start"
          disabled={props.isGameOn}
          onClick={handleStartClick}
          title="Start game"
        />

        <Button
          userClass="controls__btn controls__btn_pause"
          disabled={!props.isGameOn}
          onClick={handleStopClick}
          title="Pause game"
        />

        <Button
          userClass="controls__btn controls__btn_results"
          disabled={props.isGameOn}
          onClick={handleResultsClick}
          title="View results table"
        />
      </div>

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