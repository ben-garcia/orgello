/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import Card from './Card/Card';

import { requestUpdateListTitle } from '../../../actions/lists';
import { requestCreateCard } from '../../../actions/cards';

import './List.scss';

const List = ({ list, lists, requestUpdateList, requestCreateNewCard }) => {
  // the UI wasn't updating with only the list prop
  // so lists prop returns ALL lists of a board.
  // find the current list which should contain up to date number of cards
  const currentList = lists.find((l) => l.id === list.id);
  const [isCardFormOpen, toggleCardForm] = useState(false);
  const [listTitle, changeListTitle] = useState(list.title);
  const [cardTitle, changeCardTitle] = useState('');
  const [isListTitleInputOpen, toggleListTitleInput] = useState(false);
  const listTitleRef = useRef(null);
  const cardTitleAreaRef = useRef(null);

  // when the card form is rendered is should be focused.
  if (isCardFormOpen) {
    setTimeout(() => cardTitleAreaRef.current.focus(), 100);
  }
  // when the title input is rendered is should be foucused.
  if (isListTitleInputOpen) {
    setTimeout(() => listTitleRef.current.focus(), 100);
  }

  return (
    <Draggable draggableId={list.title} index={list.id}>
      {(provided) => (
        <article
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="list__header">
            {isListTitleInputOpen ? (
              <input
                type="text"
                ref={listTitleRef}
                value={listTitle}
                onChange={(e) => changeListTitle(e.target.value)}
                onBlur={() => {
                  if (!listTitleRef.current.value) {
                    changeListTitle(list.title);
                  }

                  const newList = {
                    id: list.id,
                    title: listTitleRef.current.value,
                  };
                  requestUpdateList(newList);
                  toggleListTitleInput(!isListTitleInputOpen);
                }}
              />
            ) : (
              <h3
                className="list__title"
                onClick={() => toggleListTitleInput(!isListTitleInputOpen)}
              >
                {listTitle}
              </h3>
            )}
          </div>
          <div
            className="list-cards"
            style={currentList.cards ? {} : { display: 'none' }}
          >
            {currentList.cards &&
              currentList.cards.map((card) => (
                <Card key={card.id} card={card} />
              ))}
          </div>
          {isCardFormOpen ? (
            <form className="list-form">
              <textarea
                className="list-form__textarea"
                type="text"
                placeholder="Enter a title for this card"
                ref={cardTitleAreaRef}
                onChange={() => changeCardTitle(cardTitleAreaRef.current.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // when user pressed 'Enter'
                    // then submit
                    const newCard = {
                      title: cardTitle,
                      order: 1,
                      listId: list.id,
                    };
                    requestCreateNewCard(newCard);
                    changeCardTitle('');
                    cardTitleAreaRef.current.value = '';
                  }
                }}
              />
              <div className="list-form__inner">
                <button
                  className="list-from__button list-form__button--submit"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    const newCard = {
                      title: cardTitle,
                      order: 1,
                      listId: list.id,
                    };
                    requestCreateNewCard(newCard);
                    changeCardTitle('');
                    cardTitleAreaRef.current.value = '';
                  }}
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
      )}
    </Draggable>
  );
};

List.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
        listId: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
      })
    ),
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  requestUpdateList: PropTypes.func.isRequired,
  requestCreateNewCard: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      cards: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          order: PropTypes.number.isRequired,
          listId: PropTypes.number.isRequired,
          createdAt: PropTypes.string.isRequired,
          updatedAt: PropTypes.string.isRequired,
        })
      ),
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  lists: state.board.lists,
});

const mapDispatchToProps = (dispatch) => ({
  requestUpdateList: (list) => dispatch(requestUpdateListTitle(list)),
  requestCreateNewCard: (card) => dispatch(requestCreateCard(card)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
