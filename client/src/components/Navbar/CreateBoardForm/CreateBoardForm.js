/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BackgroundOptions from './BackgroundOptions/BackgroundOptions';

import changeCreateBoardFormStatus from '../../../actions/boards';

import './CreateBoardForm.scss';

const images = [
  {
    id: 1,
    url:
      'https://images.unsplash.com/photo-1554291499-563a504e0734?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9',
  },
  {
    id: 2,
    url:
      'https://images.unsplash.com/photo-1555485038-a63855aa7ba9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9',
  },
  {
    id: 3,
    url:
      'https://images.unsplash.com/photo-1555488205-d5e67846cf40?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9',
  },
  {
    id: 4,
    url:
      'https://images.unsplash.com/photo-1555454762-24a52b98f75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9',
  },
];

const colors = [
  {
    id: 1,
    value: 'rgb(0, 121, 191)',
  },
  {
    id: 2,
    value: 'rgb(210, 144, 52)',
  },
  {
    id: 3,
    value: 'rgb(81, 152, 57)',
  },
  {
    id: 4,
    value: 'rgb(176, 70, 50)',
  },
];

const CreateBoardForm = ({ changeBoardFormStatus, isCreateBoardFormOpen }) => {
  const [isDisabled, toggleDisabledButton] = useState(true);
  const [currentBoardBackground, setBoardBackground] = useState({
    backgroundImage: `url(${images[0].url})`,
  });
  const [isBackgroundOptionsOpen, toggleBackgroundOptions] = useState(false);

  // extract the key from the currentBoardBackground object
  // posibble values are'backgroundImage' or 'backgroundColor'
  const boardBackgroundKey = Object.keys(currentBoardBackground)[0];
  // extract the value from the currentBoardBackground object
  // possible values are
  // 'url(url goes here) for an backgroundImage
  // 'rgba(value goes here) for backgroundColor
  const boardBackgroundValue = Object.values(currentBoardBackground)[0];

  return (
    <div
      className="create-board-overlay"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          changeBoardFormStatus(!isCreateBoardFormOpen);
        }
      }}
    >
      <div className="create-board-form">
        <form className="board-form">
          <div className="board-form__container">
            <div className="board-form__inner" style={currentBoardBackground}>
              <input
                className="board-form__input"
                text="text"
                placeholder="Add board title"
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    toggleDisabledButton(false);
                  } else {
                    toggleDisabledButton(true);
                  }
                }}
              />
              <button
                className="close-button"
                type="button"
                onClick={() => changeBoardFormStatus(!isCreateBoardFormOpen)}
              >
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="background">
              <ul className="background__list">
                {images.map((image) => (
                  <li key={image.id} className="background__item">
                    <button
                      className={
                        boardBackgroundValue === `url(${image.url})`
                          ? 'background__button background__button--active'
                          : 'background__button'
                      }
                      type="button"
                      style={{ backgroundImage: `url(${image.url})` }}
                      onClick={() =>
                        setBoardBackground({
                          backgroundImage: `url(${image.url})`,
                        })
                      }
                    >
                      {boardBackgroundKey === 'backgroundImage' &&
                      boardBackgroundValue === `url(${image.url})` ? (
                        <i className="fas fa-check" />
                      ) : null}
                    </button>
                  </li>
                ))}
                {colors.map((color) => (
                  <li key={color.id} className="background__item">
                    <button
                      className={
                        boardBackgroundValue === color.value
                          ? 'background__button background__button--active'
                          : 'background__button'
                      }
                      type="button"
                      style={{ backgroundColor: `${color.value}` }}
                      onClick={() =>
                        setBoardBackground({
                          backgroundColor: `${color.value}`,
                        })
                      }
                    >
                      {boardBackgroundKey === 'backgroundColor' &&
                      boardBackgroundValue === `${color.value}` ? (
                        <i className="fas fa-check" />
                      ) : null}
                    </button>
                  </li>
                ))}
                <li className="background__item">
                  <button
                    className="background__button background__button--options"
                    type="button"
                    onClick={() =>
                      toggleBackgroundOptions(!isBackgroundOptionsOpen)
                    }
                  >
                    <i className="fas fa-ellipsis-h" />
                  </button>
                </li>
              </ul>
              {isBackgroundOptionsOpen ? <BackgroundOptions /> : null}
            </div>
          </div>
          <button
            className={
              isDisabled
                ? 'board-form__submit-button board-form__submit-button--disabled'
                : 'board-form__submit-button board-form__submit-button--enabled'
            }
            type="submit"
            disabled={isDisabled}
          >
            Create Board
          </button>
        </form>
      </div>
    </div>
  );
};

CreateBoardForm.propTypes = {
  isCreateBoardFormOpen: PropTypes.bool.isRequired,
  changeBoardFormStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isCreateBoardFormOpen: state.isCreateBoardFormOpen,
});

const mapDispatchToProps = (dispatch) => ({
  changeBoardFormStatus: (status) =>
    dispatch(changeCreateBoardFormStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBoardForm);
