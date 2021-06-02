import React, { useState, useEffect, useRef } from 'react';
import Board from '../Board/Board';
import Controls from '../Controls/Controls';
import './MainScreen.css';

function MainScreen() {
  const [ gameStatus, setGameStatus ] = useState(false);
  const [ timeCounter, setTimeCounter ] = useState(0);
  const [ winStatus, setWinStatus ] = useState(false);

  const gameStatusRef = useRef(gameStatus);
  const winStatusRef = useRef(winStatus);
  gameStatusRef.current = gameStatus;
  winStatusRef.current = winStatus;

  useEffect(() => {

    const controlGame = () => {
      return new Promise((resolve, reject) => {
        setTimeCounter(0);
        const timeInterval = 1000;
        const startTime = Date.now();
        let expected = startTime + timeInterval;

        const next = () => {
          if (winStatusRef.current) {
            resolve();
          } else if (!gameStatusRef.current) {
            reject();
          } else {
            const dt = Date.now() - expected;
            if (dt < timeInterval) {
              const secondsCount = Math.floor((expected - startTime) / 1000);
              setTimeCounter(secondsCount);
              expected += timeInterval;
              setTimeout(next, Math.max(0, timeInterval - dt));
            }
          };
        }
        setTimeout(next, timeInterval);
      });
    };

    if (gameStatus) {
      controlGame()
      .then(() => {
        console.log('Success');
      })
      .catch(() => {
        console.log('Stop');
    });
  }

  }, [gameStatus, winStatus]);

  const handleStartGame = () => {
    setGameStatus(true);
  };

  const handleStopGame = () => {
    setGameStatus(false);
    //setWinStatus(true);
  };

  return (
    <div className="main">
      <Controls
        onStartGame={handleStartGame}
        onStopGame={handleStopGame}
        isGameOn={gameStatus}
        timeCounter={timeCounter}
      />
      <Board />
    </div>
  );
}

export default MainScreen;