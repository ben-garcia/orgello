/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import { requestUpdateCardTitle } from '../../../../actions/cards';

import './Card.scss';

// implement PureComponent with React.memo by passing it a function
const Card = React.memo(({ card, cardIndex, requestUpdateNewCardTitle }) => {
  const [isTitleInputOpen, toggleTitleInputOpen] = useState(false);
  const [currentTitle, changeCurrentTitle] = useState(card.title);
  const titleInputRef = useRef(null);

  if (isTitleInputOpen) {
    setTimeout(() => titleInputRef.current.focus(), 100);
  }

  return (
    <Draggable draggableId={`${card.title}-${card.id}`} index={cardIndex}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isTitleInputOpen ? (
            <input
              className="card__input"
              type="text"
              ref={titleInputRef}
              value={currentTitle}
              onChange={() => {
                changeCurrentTitle(titleInputRef.current.value);
              }}
              onBlur={() => {
                if (
                  titleInputRef.current.value &&
                  currentTitle !== card.title
                ) {
                  const newCard = {
                    id: card.id,
                    title: titleInputRef.current.value,
                    listId: card.listId,
                  };
                  requestUpdateNewCardTitle(newCard);
                } else {
                  changeCurrentTitle(card.title);
                }
              }}
            />
          ) : (
            <div
              className="card__title"
              onClick={() => toggleTitleInputOpen(!isTitleInputOpen)}
            >
              {currentTitle}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
});

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    listId: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  cardIndex: PropTypes.number.isRequired,
  requestUpdateNewCardTitle: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requestUpdateNewCardTitle: (newTitle) =>
    dispatch(requestUpdateCardTitle(newTitle)),
});

export default connect(
  null,
  mapDispatchToProps
)(Card);
