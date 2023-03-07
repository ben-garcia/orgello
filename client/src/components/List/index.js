/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import Card from '../Card';
import { changeListTitle, requestUpdateListTitle } from '../../actions/lists';
import { addCard, requestCreateCard } from '../../actions/cards';
import './styles.scss';

const List = ({
  username,
  list,
  lists,
  listIndex,
  requestUpdateList,
  changeListNewTitle,
  addNewCard,
  requestCreateNewCard,
}) => {
  // the UI wasn't updating with only the list prop
  // so lists prop returns ALL lists of a board.
  // find the current list which should contain up to date number of cards
  const currentList = lists.find((l) => l.id === list.id);
  const [isCardFormOpen, toggleCardForm] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);
  const [cardTitle, setCardTitle] = useState('');
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
    <Draggable draggableId={`${list.title}-${list.id}`} index={listIndex}>
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
                onChange={(e) => setListTitle(e.target.value)}
                onBlur={() => {
                  if (!listTitleRef.current.value) {
                    setListTitle(list.title);
                  }

                  const newList = {
                    id: list.id,
                    title: listTitleRef.current.value,
                  };

                  // send the request only if the title has changed
                  if (listTitle !== list.title) {
                    if (username !== 'orgelloguest') {
                      requestUpdateList(newList);
                    } else {
                      changeListNewTitle(newList.id, newList.title);
                    }
                  }
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
          <Droppable
            droppableId={`${list.title}-${list.id}`}
            direction="vertical"
            type="CARD"
          >
            {(droppableProvided) => (
              <div
                className="list-cards"
                ref={droppableProvided.innerRef}
                style={list.cards.length === 0 ? { overflow: 'visible' } : {}}
              >
                {currentList.cards &&
                  currentList.cards
                    .sort((a, b) => a.order - b.order)
                    .map((card, index) => (
                      <Card key={card.id} card={card} cardIndex={index} />
                    ))}
                {isCardFormOpen && (
                  <form className="list-form">
                    <textarea
                      className="list-form__textarea"
                      type="text"
                      placeholder="Enter a title for this card"
                      ref={cardTitleAreaRef}
                      onChange={() =>
                        setCardTitle(cardTitleAreaRef.current.value)
                      }
                      onKeyDown={(e) => {
                        // when the user presses the enter key and
                        // card title isn't empty
                        if (
                          e.key === 'Enter' &&
                          cardTitleAreaRef.current.value.length > 0
                        ) {
                          let order = null;
                          if (list.cards.length === 0) {
                            order = 100000;
                          } else {
                            order = 200000 * list.cards.length;
                          }

                          // when user pressed 'Enter'
                          // then submit
                          const newCard = {
                            title: cardTitle.trim(),
                            order,
                            listId: list.id,
                          };
                          if (newCard.title) {
                            if (username !== 'orgelloguest') {
                              requestCreateNewCard(newCard);
                            } else {
                              const date = new Date().toString();
                              newCard.id = Math.random();
                              newCard.createdAt = date;
                              newCard.updatedAt = date;
                              addNewCard(newCard);
                            }
                          }
                          // fix
                          // after user hits 'Enter'
                          // prevent card title to start on the second line
                          setTimeout(() => {
                            cardTitleAreaRef.current.value = '';
                            setCardTitle('');
                          }, 10);
                        }
                      }}
                    />
                    <div className="list-form__inner">
                      <button
                        className="list-from__button list-form__button--submit"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();

                          let order = null;
                          if (list.cards.length === 0) {
                            order = 100000;
                          } else {
                            order = 200000 * list.cards.length;
                          }

                          const newCard = {
                            title: cardTitle.trim(),
                            order,
                            listId: list.id,
                          };
                          if (newCard.title) {
                            if (username !== 'orgelloguest') {
                              requestCreateNewCard(newCard);
                            } else {
                              const date = new Date().toString();
                              newCard.id = Math.random();
                              newCard.createdAt = date;
                              newCard.updatedAt = date;
                              addNewCard(newCard);
                            }
                          }
                          setCardTitle('');
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
                )}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          {!isCardFormOpen && (
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
  username: PropTypes.string.isRequired,
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
  listIndex: PropTypes.number.isRequired,
  requestUpdateList: PropTypes.func.isRequired,
  changeListNewTitle: PropTypes.func.isRequired,
  addNewCard: PropTypes.func.isRequired,
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
  username: state.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  requestUpdateList: (list) => dispatch(requestUpdateListTitle(list)),
  changeListNewTitle: (listId, newTitle) =>
    dispatch(changeListTitle(listId, newTitle)),
  addNewCard: (card) => dispatch(addCard(card)),
  requestCreateNewCard: (card) => dispatch(requestCreateCard(card)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
