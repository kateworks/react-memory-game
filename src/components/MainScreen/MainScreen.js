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

    const controlGame = (timeInterval) => {
      return new Promise((resolve, reject) => {
        const startTime = Date.now();
        let expected = startTime + timeInterval;
        let secondsCount = 0;

        const next = () => {
          if (winStatusRef.current) {
            resolve(secondsCount);
          } else if (!gameStatusRef.current) {
            reject(secondsCount);
          } else {
            const dt = Date.now() - expected;
            if (dt < timeInterval) {
              secondsCount = Math.floor((expected - startTime) / 1000);
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
      controlGame(1000)
      .then((result) => {
        console.log('Success ', result);
      })
      .catch((result) => {
        console.log('Stop', result);
    });
  }

  }, [gameStatus, winStatus]);

  const handleStartGame = () => {
    // new game: winStatus, board
    setTimeCounter(0);
    setGameStatus(true);
  };

  const handleStopGame = () => {
    setGameStatus(false);
  };

  const handleWinning = () => {
    setGameStatus(false);
    setWinStatus(true);
  };

  return (
    <div className="main">
      <Controls
        onStartGame={handleStartGame}
        onStopGame={handleStopGame}
        isGameOn={gameStatus}
        timeCounter={timeCounter}
      />
      <Board onWin={handleWinning} isGameOn={gameStatus}/>

    </div>
  );
}

export default MainScreen;