import React from 'react';
import './Card.css';

function Card({ card, onClick }) {

  const handleClick = () => {
    onClick(card);
  };

  if (card.isVisible) {
    return (
      <article className="card" onClick={handleClick}>
        <div className={`card__container${card.isOpen ? ' card_open' : ''}`}>
          <div className="card__front"/>
          <img className="card__back" src={card.link} alt={card.text}/>
        </div>
      </article>
    );
  } else {
    return (
      <article className="card">
        <div className="card__empty" />
      </article>
    );
  }
}

export default Card;