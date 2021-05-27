import React from 'react';
import './Card.css';

function Card(props) {
  return (
    <article className="card">
      <div className="card__container">
        <img className="card__front" src={props.link} alt={props.link}/>
        <div className="card__back"/>
      </div>
    </article>
  );
}

export default Card;