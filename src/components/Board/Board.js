import React, { useState, useEffect, useRef } from 'react';
import Card from '../Card/Card';
import { createShuffledArray } from '../../utils/array';
import { cardsImages } from '../../utils/cards-images';
import { BOARD_SIZE } from '../../utils/const';
import './Board.css';

function Board(props) {
  const [ cardsList, setCardsList ] = useState([]);
  const [ twoCardsFlag, setTwoCardsFlag ] = useState(false);
  const [ score, setScore ] = useState(0);
  const [ openState, setOpenState ] = useState(0);
  const openStateRef = useRef(openState);
  openStateRef.current = openState;

  useEffect(() => {
    const numberArray = createShuffledArray(BOARD_SIZE / 2);
    const cardsArray = numberArray.map((item, index) => {
      const { link, text } = cardsImages[item - 1];
      return ({
        id: index, number: item, link, text, isVisible: true, isOpen: false,
      });
    });
    setCardsList(cardsArray);
  }, []);

  useEffect(() => {
    if (score === BOARD_SIZE) {
      props.onWin();
      const numberArray = createShuffledArray(BOARD_SIZE / 2);
      const cardsArray = numberArray.map((item, index) => {
        const { link, text } = cardsImages[item - 1];
        return ({
          id: index, number: item, link, text, isVisible: true, isOpen: false,
        });
      });
      setCardsList(cardsArray);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  useEffect(() => {
    if (twoCardsFlag) {
      setTimeout(() => {
        const cards = cardsList.filter(item => item.isOpen);
        let newList = [];

        if (cards.length === 2 && cards[0].number === cards[1].number) {
          newList = cardsList.map((item) => (
            item.id === cards[0].id || item.id === cards[1].id
            ? {...item, isOpen: false, isVisible : false}
            : item
          ));
        } else {
          newList = cardsList.map((item) => (
            item.id === cards[0].id || item.id === cards[1].id
            ? {...item, isOpen : false}
            : item
          ));
        }
        setCardsList(newList);
        setTwoCardsFlag(false);
      }, 1000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twoCardsFlag]);

  useEffect(() => {
    const cards = cardsList.filter(item => item.isOpen);
    setOpenState(cards.length);
    const newScore = cardsList.filter(item => !item.isVisible).length;
    setScore(newScore)
  }, [cardsList]);

  useEffect(() => {
    const waitForNextCard = (timeOutMs) => {
      return new Promise((resolve, reject) => {
        const next = () => {
          if (openStateRef.current === 2) {
            resolve();
          } else if((timeOutMs -= 100) < 0) {
            reject();
          } else {
            setTimeout(next, 100);
          }
        }
        setTimeout(next, 100);
      });
    };

    const hideCard = (cardId) => {
      const newList = cardsList.map((item) => (
        item.id === cardId ? {...item, isOpen : false} : item
      ));
      setCardsList(newList);
    };

    if (openStateRef.current === 1) {
      waitForNextCard(3000)
      .then(() => {
        setTwoCardsFlag(true);
      })
      .catch(() => {  // Hide one card
        const cards = cardsList.filter(item => item.isOpen);
        hideCard(cards[0].id);
      });
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openState]);


  const handleClick = (card) => {
    if (card.isVisible && !card.isOpen && openState < 2) {
      const newList = cardsList.map((item) => (
        item.id === card.id ? {...item, isOpen : true} : item
      ));
      setCardsList(newList);
    }
  };

  const getCardsList = (cards) => {
    if (cards.length > 0) {
      return cards.map((oneCard) => (
        <Card key={oneCard.id} card={oneCard} onClick={handleClick}/>
      ));
    }
  };

  return (
    <section className={`board ${props.isGameOn ? 'board_enabled' : 'board_disabled'}`}>
      <div className="board__cards-container">
        {getCardsList(cardsList)}
      </div>
    </section>
  );
}

export default Board;