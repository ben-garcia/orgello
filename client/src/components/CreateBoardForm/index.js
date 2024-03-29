/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import BackgroundOptions from '../BackgroundOptions';
import {
  changeCreateBoardFormStatus,
  changeBackgroundOptions,
  changeCreateBoardTitle,
  changeCreateBoardBackground,
  requestLatestSixPhotos,
} from '../../actions/boards';
import {
  getBoardInfo,
  requestBoardInformation,
  receivedBoardInformation,
} from '../../actions/board';
import colors from '../../api/colors';
import { submitNewBoard, triggerPhotoDownload } from '../../api';
import './styles.scss';
import { TEST_ACCOUNT_USERNAME } from '../../constants';

const CreateBoardForm = ({
  history,
  userId,
  username,
  newBoardTitle,
  changeBoardFormStatus,
  isCreateBoardFormOpen,
  isBackgroundOptionsOpen,
  changeBoardTitle,
  changeBackOptions,
  currentCreateBoardBackground,
  changeBoardBackground,
  requestSixPhotos,
  latestSixPhotos,
  getBoardInformation,
  requestBoardInfo,
  receivedBoardInfo,
}) => {
  const [isDisabled, toggleDisabledButton] = useState(true);
  // will hold a reference to the id of a photo the user
  // chose as the background image.
  const [photoId, changePhotoId] = useState('');

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
  let boardBackgroundValue = Object.values(currentCreateBoardBackground)[0]
    .thumbnail;

  if (!boardBackgroundValue) {
    boardBackgroundValue = currentCreateBoardBackground[boardBackgroundKey];
  }

  return (
    <div
      className="create-board-overlay"
      onClick={(e) => {
        if (e.currentTarget === e.target && !isBackgroundOptionsOpen) {
          // close the create board menu when the user clicks outside
          // the menu
          changeBoardFormStatus(false);
        }
        if (
          e.currentTarget === e.target ||
          ((e.target.className === 'board-form__input' ||
            e.target.className === 'board-form__inner') &&
            isBackgroundOptionsOpen)
        ) {
          // close the background options menu when user either clicks
          // the board title input, board background, or anywhere outside(overlay)
          changeBackOptions(false);
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
              style={
                currentCreateBoardBackground.backgroundImage
                  ? {
                    backgroundImage:
                      currentCreateBoardBackground.backgroundImage.thumbnail,
                  }
                  : currentCreateBoardBackground
              }
            >
              <input
                className="board-form__input"
                text="text"
                placeholder="Add board title"
                onChange={(e) => {
                  // take action only when the input isn't empty
                  if (e.target.value.length > 0) {
                    // dipatch action to change title
                    changeBoardTitle(e.target.value);
                    // disable the 'Create Board' button
                    toggleDisabledButton(false);
                  } else {
                    // enable the 'Create Board' button
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
                  .filter((_, i) => i < 4)
                  .map((image) => {
                    if (!photoId) {
                      changePhotoId(image.id);
                    }
                    return (
                      <li key={image.id} className="background__item">
                        <button
                          className={
                            boardBackgroundValue === `url(${image.urls.thumb})`
                              ? 'background__button background__button--active'
                              : 'background__button'
                          }
                          type="button"
                          style={{
                            backgroundImage: `url(${image.urls.thumb})`,
                          }}
                          onClick={() => {
                            changePhotoId(image.id);
                            changeBoardBackground({
                              backgroundImage: {
                                thumbnail: `url(${image.urls.thumb})`,
                                regular: `url(${image.urls.regular})`,
                              },
                            });
                          }}
                        >
                          {/* if background matches image then render white
                            checkmark */}
                          {boardBackgroundKey === 'backgroundImage' &&
                            boardBackgroundValue ===
                            `url(${image.urls.thumb})` ? (
                            <i className="fas fa-check" />
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                {colors
                  .filter((_, i) => i < 4)
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
                        {/* render white checkmark if background matches color value */}
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
                    onClick={() => changeBackOptions(!isBackgroundOptionsOpen)}
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
            onClick={async (e) => {
              e.preventDefault();

              const newBoard = {
                title: newBoardTitle,
                background: currentCreateBoardBackground.backgroundImage
                  ? currentCreateBoardBackground.backgroundImage.regular
                  : currentCreateBoardBackground.backgroundColor,
                ownerId: userId,
                lists: [],
              };

              if (username !== TEST_ACCOUNT_USERNAME) {
                // the newly created board.
                const response = await submitNewBoard(newBoard);
                // add the id given by the server to the newly created board.
                newBoard.id = response.id;
                // save to local storage
                localStorage.setItem('board', JSON.stringify(newBoard));
                // update the last info on the board from the server
                // more specifically the empty lists array
                // so that there is no error when creating the first list
                requestBoardInfo(newBoard);
                //
                // send the request to the server api
                // add board info to the store
                getBoardInformation(newBoard);
                // remove the create new board component
                changeBoardFormStatus(false);
                // remove the background options panel
                changeBackOptions(false);
                // trigger a download
                triggerPhotoDownload(photoId);
              } else {
                newBoard.id = Math.random();
                receivedBoardInfo(newBoard);
                // wait to remove the board from local storage
                // so that when the user is redirected the dashboard page
                // on page reload after creating a new board
                setTimeout(() => {
                  localStorage.removeItem('board');
                }, 2000);
                // remove the create new board component
                changeBoardFormStatus(false);
                // remove the background options panel
                changeBackOptions(false);
              }
              // replace the url
              // with /board/:boardTitle
              // to prevent url having spaces(because of the board title)
              // replace any empty characters with the '-' character
              history.replace(`/board/${newBoardTitle.replace(/ /g, '-')}`);
            }}
          >
            Create Board
          </button>
        </form>
      </div>
    </div>
  );
};

CreateBoardForm.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  isCreateBoardFormOpen: PropTypes.bool.isRequired,
  isBackgroundOptionsOpen: PropTypes.bool.isRequired,
  changeBackOptions: PropTypes.func.isRequired,
  newBoardTitle: PropTypes.string.isRequired,
  changeBoardTitle: PropTypes.func.isRequired,
  changeBoardFormStatus: PropTypes.func.isRequired,
  currentCreateBoardBackground: PropTypes.shape().isRequired,
  changeBoardBackground: PropTypes.func.isRequired,
  requestSixPhotos: PropTypes.func.isRequired,
  latestSixPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
  getBoardInformation: PropTypes.func.isRequired,
  requestBoardInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userId: state.user.id,
  username: state.user.username,
  newBoardTitle: state.createBoard.title,
  isCreateBoardFormOpen: state.createBoard.isFormOpen,
  isBackgroundOptionsOpen: state.createBoard.isBackgroundOptionsOpen,
  currentCreateBoardBackground: state.createBoard.currentBackground,
  latestSixPhotos: state.createBoard.latestSixPhotos,
});

const mapDispatchToProps = (dispatch) => ({
  changeBoardFormStatus: (status) =>
    dispatch(changeCreateBoardFormStatus(status)),
  changeBackOptions: (newStatus) =>
    dispatch(changeBackgroundOptions(newStatus)),
  changeBoardTitle: (newTitle) => dispatch(changeCreateBoardTitle(newTitle)),
  changeBoardBackground: (newCreateBoardBackground) =>
    dispatch(changeCreateBoardBackground(newCreateBoardBackground)),
  requestSixPhotos: () => dispatch(requestLatestSixPhotos()),
  getBoardInformation: (info) => dispatch(getBoardInfo(info)),
  requestBoardInfo: (board) => dispatch(requestBoardInformation(board)),
  receivedBoardInfo: (board) => dispatch(receivedBoardInformation(board)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // withRouter hoc that passes history props to CreateBoardForm
)(withRouter(CreateBoardForm));
