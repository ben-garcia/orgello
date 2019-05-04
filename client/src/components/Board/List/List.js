/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { requestUpdateListTitle } from '../../../actions/lists';

import './List.scss';

const List = ({ list, requestUpdateList }) => {
  const [isCardFormOpen, toggleCardForm] = useState(false);
  const [listTitle, changeListTitle] = useState(list.title);
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
    <article className="list" style={isCardFormOpen ? {} : { height: '90px' }}>
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

List.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  requestUpdateList: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requestUpdateList: (list) => dispatch(requestUpdateListTitle(list)),
});

export default connect(
  null,
  mapDispatchToProps
)(List);
