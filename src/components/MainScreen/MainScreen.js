import React from 'react';
import Board from '../Board/Board';
import Controls from '../Controls/Controls';

import './MainScreen.css';

function MainScreen() {
  return (
    <div className="main">
      <Controls/>
      <Board />
    </div>
  );
}

export default MainScreen;