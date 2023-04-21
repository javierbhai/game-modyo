import React from 'react';

const Card = ({ id, isFlipped, handleClick, cardNumber, card }) => (
  <div className='card__two'>
    <div className='card__wrapper'>
      <div id={id} className={`${isFlipped && 'clever'} front`} onClick={handleClick}>
        <i className="fa fa-question-circle" aria-hidden="true"></i>
      </div>
      <div id={id} className={`${isFlipped && 'clever'} back`} onClick={handleClick}>
        {card.imageUrl ? <img id={id} src={card.imageUrl} alt="Animal" /> : <i className="fa fa-heart" aria-hidden="true"></i>}
      </div>
    </div>
  </div>
);

export default Card;