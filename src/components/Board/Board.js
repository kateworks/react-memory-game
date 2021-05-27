import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { createShuffledArray } from '../../utils/array';
import { cardsImages } from '../../utils/cards-images';
import './Board.css';

function Board(props) {
  const [ cardsList, setCardsList ] = useState([]);

  const showCardsList = (cards) => {
    if (cards.length > 0) {
      return cards.map((card) => (
        <Card key={card.id} link={card.link}/>
      ));
    }
  };

  useEffect(() => {
    const createCardsArray = () => {
      const cardsArray = [];
      const numberArray = createShuffledArray(18);

      numberArray.forEach((item, index) => {
        const link = cardsImages[item - 1];
        cardsArray.push({ id: index, link });
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