import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { createShuffledArray } from '../../utils/array';
import { cardsImages } from '../../utils/cards-images';
import './Board.css';

function Board(props) {
  const [ cardsList, setCardsList ] = useState([]);
  //const [ visibleCardsNumber, setVisibleCardsNumber ] = useState(0);

  const handleClick = (card) => {
    if (card.isVisible) {
      if (!card.isOpen) {
        const newCardsList = cardsList.map((item) => (
          item.id === card.id ? {...item, isOpen : true} : item
        ));
        setCardsList(newCardsList);
      }
    }
  };

  const showCardsList = (cards) => {
    if (cards.length > 0) {
      return cards.map((oneCard) => (
        <Card
          key={oneCard.id}
          card={oneCard}
          onClick={handleClick}
        />
      ));
    }
  };

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

  return (
    <section className="board">
      <div className="board__cards-container">
        {showCardsList(cardsList)}
      </div>
    </section>
  );
}

export default Board;