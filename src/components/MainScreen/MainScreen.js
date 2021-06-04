import React, { useState, useEffect, useRef } from 'react';
import Board from '../Board/Board';
import Controls from '../Controls/Controls';
import Form from '../Form/Form';
import './MainScreen.css';

function MainScreen() {
  const [ gameStatus, setGameStatus ] = useState(false);
  const [ timeCounter, setTimeCounter ] = useState(0);
  const [ prevTime, setPrevTime ] = useState(0);
  const [ winStatus, setWinStatus ] = useState(false);
  const [ areResultsVisible, setAreResultsVisible ] = useState(false);

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
              secondsCount = prevTime + Math.floor((expected - startTime) / 1000);
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
        setPrevTime(0);
      })
      .catch((result) => {
        console.log('Stop', result);
        setPrevTime(result);
    });
  }

  }, [gameStatus, winStatus, prevTime]);

  const handleStartGame = () => {
    setGameStatus(true);
    setWinStatus(false);
  };

  const handleStopGame = () => {
    setGameStatus(false);
  };

  const handleWinning = () => {
    setGameStatus(false);
    setWinStatus(true);
    setTimeCounter(0);
  };

  const handleResultsClick = () => {
    setAreResultsVisible(true);
  };

  return (
    <div className="main">
      <Controls
        onStartGame={handleStartGame}
        onStopGame={handleStopGame}
        onResultsClick={handleResultsClick}
        isGameOn={gameStatus}
        timeCounter={timeCounter}
      />
      <Board onWin={handleWinning} isGameOn={gameStatus}/>

      { areResultsVisible && <Form />}

    </div>
  );
}

export default MainScreen;