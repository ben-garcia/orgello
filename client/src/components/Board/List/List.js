import React, { useState, useRef } from 'react';

import './List.scss';

const List = ({ title }) => {
  const [isCardFormOpen, toggleCardForm] = useState(false);
  const cardTitleAreaRef = useRef(null);

  if (isCardFormOpen) {
    setTimeout(() => cardTitleAreaRef.current.focus(), 100);
  }

  return (
    <article className="list" style={isCardFormOpen ? {} : { height: '90px' }}>
      <div className="list__header">
        <h3 className="list__title">{title}</h3>
      </div>
      {isCardFormOpen ? (
        <form className="list-form">
          <textarea
            className="list-form__textarea"
            type="text"
            placeholder="Enter a title for this card"
            ref={cardTitleAreaRef}
          />
          <div className="list-form__inner">
            <button
              className="list-from__button list-form__button--submit"
              type="submit"
            >
              Add a card
            </button>
            <button
              className="list-from__button list-form__button--close"
              type="button"
              onClick={() => toggleCardForm(!isCardFormOpen)}
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </form>
      ) : (
        <button
          className="list__button"
          type="button"
          onClick={() => toggleCardForm(!isCardFormOpen)}
        >
          <i className="fas fa-plus" />
          <span className="list__text">Add a Card</span>
        </button>
      )}
    </article>
  );
};

export default List;
