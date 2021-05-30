import React from 'react';
import Button from '../Button/Button';
import './Controls.css';

function Controls(props) {
  return(
    <nav className="controls">
      {/* Time, Score */}
      <Button userClass="controls__btn">
        Start
      </Button>
      <Button userClass="controls__btn">
        Stop
      </Button>
      <Button userClass="controls__btn">
        Pause
      </Button>
    </nav>
  );
}

export default Controls;