import React, { useState, useEffect, useRef } from 'react';
import Card from '../Card/Card';
import { createShuffledArray } from '../../utils/array';
import { cardsImages } from '../../utils/cards-images';
import './Board.css';

function Board(props) {
  const [ cardsList, setCardsList ] = useState([]);
  const [ openState, setOpenState ] = useState(0);
  const openStateRef = useRef(openState);
  openStateRef.current = openState;

  useEffect(() => {
    const createCardsArray = () => {
      const cardsArray = [];
      const numberArray = createShuffledArray(18);

      numberArray.forEach((item, index) => {
        const { link, text } = cardsImages[item - 1];
        cardsArray.push({
          id: index, number: item, link, text, isVisible: true, isOpen: false
        });
      });

      return cardsArray;
    };

    setCardsList(createCardsArray);
  }, []);

  useEffect(() => {
    const cards = cardsList.filter(item => item.isOpen);
    setOpenState(cards.length);
  }, [cardsList]);

  useEffect(() => {

    const waitForNextCard = (timeOutMs) => {
      return new Promise((resolve, reject) => {
        const next = () => {
          if (openStateRef.current === 2) {
            resolve();
          } else if((timeOutMs -= 100) < 0)
            reject();
          else
            setTimeout(next, 100);
        }
        setTimeout(next, 100);
      });
    }

    const hideCard = (card) => {
      const newList = cardsList.map((item) => (
        item.id === card.id ? {...item, isOpen : false} : item
      ));
      setCardsList(newList);
    };

    if (openStateRef.current === 1) {
      waitForNextCard(3000)
      .then(() => {
      })
      .catch(() => {  // Hide one card
        const cards = cardsList.filter(item => item.isOpen);
        hideCard(cards[0]);
      });
    }

  }, [openState]);


  const openCard = (card) => {
    const newList = cardsList.map((item) => (
      item.id === card.id ? {...item, isOpen : true} : item
    ));
    setCardsList(newList);
  };

  const handleClick = (card) => {
    if (card.isVisible && !card.isOpen && openState < 2) {
      openCard(card);
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
    <section className="board">
      <div className="board__cards-container">
        {getCardsList(cardsList)}
      </div>
    </section>
  );
}

export default Board;