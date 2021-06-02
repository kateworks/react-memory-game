import React from 'react';
import Button from '../Button/Button';
import './Controls.css';

function Controls(props) {
  return(
    <nav className="controls">
      <Button userClass="controls__btn">
        Start
      </Button>
      <Button userClass="controls__btn">
        Stop
      </Button>
      <span className="controls__time"/>
    </nav>
  );
}

export default Controls;