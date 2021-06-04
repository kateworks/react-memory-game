import React, { useState, useEffect, useRef } from 'react';
import Board from '../Board/Board';
import Controls from '../Controls/Controls';
import FormInput from '../Forms/FormInput';
import FormResults from '../Forms/FormResults';
import { LOCAL_STORAGE_KEY } from '../../utils/const';
import './MainScreen.css';

function MainScreen() {
  const [ gameStatus, setGameStatus ] = useState(false);
  const [ winStatus, setWinStatus ] = useState(false);
  const [ timeCounter, setTimeCounter ] = useState(0);
  const [ savedTime, setSavedTime ] = useState(0);
  const [ areResultsVisible, setAreResultsVisible ] = useState(false);
  const [ isFormVisible, setIsFormVisible ] = useState(false);

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
              secondsCount = savedTime + Math.floor((expected - startTime) / 1000);
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
        // console.log('Success ', result);
        setSavedTime(0);
        setIsFormVisible(true);
      })
      .catch((result) => {
        // console.log('Pause ', result);
        setSavedTime(result);
      });
    }

  }, [gameStatus, winStatus, savedTime]);

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
  };

  const handleResultsClick = () => {
    setAreResultsVisible(true);
  };

  // Save new result (name, time) to local storage
  const handleSubmitName = (name, time) => {
    let results = [];
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
      results = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    }
    results.push({ name, time });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(results));
    setIsFormVisible(false);
    setTimeCounter(0);
  };

  // Close results table
  const handleSubmitResults = () => {
    setAreResultsVisible(false);
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

      {
        isFormVisible &&
        <FormInput onSubmitName={handleSubmitName} result={timeCounter}/>
      }
      {
        areResultsVisible &&
        <FormResults onSubmitResults={handleSubmitResults}/>
      }

    </div>
  );
}

export default MainScreen;