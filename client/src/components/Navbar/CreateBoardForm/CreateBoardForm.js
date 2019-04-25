/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BackgroundOptions from './BackgroundOptions/BackgroundOptions';

import {
  changeCreateBoardFormStatus,
  changeCreateBoardBackground,
  requestLatestSixPhotos,
} from '../../../actions/boards';

import colors from '../../../api/colors';

import './CreateBoardForm.scss';

const CreateBoardForm = ({
  changeBoardFormStatus,
  isCreateBoardFormOpen,
  currentCreateBoardBackground,
  changeBoardBackground,
  requestSixPhotos,
  latestSixPhotos,
}) => {
  const [isDisabled, toggleDisabledButton] = useState(true);
  const [isBackgroundOptionsOpen, toggleBackgroundOptions] = useState(false);

  // make api request to get latest six photos when component is mounted.
  useEffect(() => {
    requestSixPhotos();
  }, []);

  // extract the key from the currentBoardBackground object
  // posibble values are'backgroundImage' or 'backgroundColor'
  const boardBackgroundKey = Object.keys(currentCreateBoardBackground)[0];
  // extract the value from the currentBoardBackground object
  // possible values are
  // 'url(url goes here) for an backgroundImage
  // 'rgba(value goes here) for backgroundColor
  const boardBackgroundValue = Object.values(currentCreateBoardBackground)[0];

  return (
    <div
      className="create-board-overlay"
      onClick={(e) => {
        if (e.currentTarget === e.target && !isBackgroundOptionsOpen) {
          changeBoardFormStatus(!isCreateBoardFormOpen);
        }
        if (
          e.currentTarget === e.target ||
          e.target.className === 'board-form__input' ||
          (e.target.className === 'board-form__inner' &&
            isBackgroundOptionsOpen)
        ) {
          toggleBackgroundOptions(false);
        }
      }}
    >
      <div
        className="create-board-form"
        style={isBackgroundOptionsOpen ? { width: 710 } : { width: 490 }}
      >
        <form className="board-form">
          <div className="board-form__container">
            <div
              className="board-form__inner"
              style={currentCreateBoardBackground}
            >
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
                {latestSixPhotos
                  .filter((image, i) => i < 4)
                  .map((image) => (
                    <li key={image.id} className="background__item">
                      <button
                        className={
                          boardBackgroundValue === `url(${image.urls.thumb})`
                            ? 'background__button background__button--active'
                            : 'background__button'
                        }
                        type="button"
                        style={{ backgroundImage: `url(${image.urls.thumb})` }}
                        onClick={() =>
                          changeBoardBackground({
                            backgroundImage: `url(${image.urls.thumb})`,
                          })
                        }
                      >
                        {boardBackgroundKey === 'backgroundImage' &&
                        boardBackgroundValue === `url(${image.urls.thumb})` ? (
                          <i className="fas fa-check" />
                        ) : null}
                      </button>
                    </li>
                  ))}
                {colors
                  .filter((c, i) => i < 4)
                  .map((color) => (
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
                          changeBoardBackground({
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
  currentCreateBoardBackground: PropTypes.shape().isRequired,
  changeBoardBackground: PropTypes.func.isRequired,
  requestSixPhotos: PropTypes.func.isRequired,
  latestSixPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  isCreateBoardFormOpen: state.createBoard.isFormOpen,
  currentCreateBoardBackground: state.createBoard.currentBackground,
  latestSixPhotos: state.createBoard.latestSixPhotos,
});

const mapDispatchToProps = (dispatch) => ({
  changeBoardFormStatus: (status) =>
    dispatch(changeCreateBoardFormStatus(status)),
  changeBoardBackground: (newCreateBoardBackground) =>
    dispatch(changeCreateBoardBackground(newCreateBoardBackground)),
  requestSixPhotos: () => dispatch(requestLatestSixPhotos()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBoardForm);