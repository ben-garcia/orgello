/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  changeCreateBoardBackground,
  changeBackgroundOptions,
  requestLatestPhotos,
  removeLatestPhotos,
  changeQueryPhotosSearchTerm,
  requestQueryPhotos,
  removeQueryPhotos,
} from '../../actions/boards';
import {
  changeActiveBoardBackground,
  requestBoardBackgroundChange,
} from '../../actions/board';
import colors from '../../api/colors';
import { triggerPhotoDownload } from '../../api';

import './styles.scss';

const BackgroundOptions = ({
  isBackgroundOptionsOpen,
  changeBackOptions,
  currentCreateBoardBackground,
  changeBoardBackground,
  latestSixPhotos,
  latestPhotos,
  removePhotos,
  requestPhotos,
  changePhotosSearchTerm,
  requestSearchPhotos,
  queryPhotos,
  removeQPhotos,
  isBoardOpen,
  changeActiveBackground,
  requestNewBoardBackground,
  boardId,
  isCreateBoardFormOpen,
}) => {
  // keep track when the user clicks 'See more' button
  // to see more photos options
  const [isColorsOptionsOpen, toggleColorsOptions] = useState(false);
  // keep track when the user clicks 'See more' button
  // to see more colors options
  const [isPhotosOptionsOpen, togglePhotosOptions] = useState(false);

  // this reference is used to change the position of the scrollbar after
  // a new batch of images have been rendered.
  const scrollRef = useRef(null);
  // reference for the search input field in the photos options
  const searchRef = useRef(null);
  // will hold a reference to the id of a photo the user
  // chose as the background image.
  const [photoId, changePhotoId] = useState('');

  // check the height of the grid container
  // at present this effect is called every render
  useEffect(() => {
    if (
      isPhotosOptionsOpen &&
      scrollRef.current.offsetHeight >= 502 &&
      latestPhotos.length > 0 &&
      latestPhotos.length < 32
    ) {
      requestPhotos();
    }
  });

  // populate the queryPhotos array with more than 18 if
  // the grid container's height is 502 or greater
  useEffect(() => {
    if (
      isPhotosOptionsOpen &&
      scrollRef.current.offsetHeight >= 502 &&
      queryPhotos.length > 0 &&
      queryPhotos.length < 32
    ) {
      requestSearchPhotos();
    }
  });

  // when PhotosOptions is open
  // search input field should have focus
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [isPhotosOptionsOpen]);

  // extract the key from the currentBoardBackground object
  // posibble values are'backgroundImage' or 'backgroundColor'
  const boardBackgroundKey = Object.keys(currentCreateBoardBackground)[0];
  // extract the value from the currentBoardBackground object
  // possible values are
  // 'url(url goes here) for an backgroundImage
  // 'rgba(value goes here) for backgroundColor
  let boardBackgroundValue = Object.values(currentCreateBoardBackground)[0]
    .thumbnail;

  // if boardBackgroundValue doesn't have a thumbnail property
  // then it contains a color value
  if (!boardBackgroundValue) {
    boardBackgroundValue = currentCreateBoardBackground[boardBackgroundKey];
  }
  // title in the header
  let title = 'Board Background';
  // array that contains photos that should be rendered
  // which is the latest 6 photos to start
  let photosToRender = latestSixPhotos;
  // colors to be rendered
  let modifiedColors = colors;

  if (latestPhotos.length > 0 && isPhotosOptionsOpen) {
    // if photos optins is open and latestPhotos isn't empty
    // render the latest photos
    photosToRender = latestPhotos;
  } else {
    photosToRender = photosToRender.filter((image, i) => i < 6);
  }

  // then query photos array has been populated(user is typing in search input field)
  // render those photos
  if (queryPhotos.length > 0 && isPhotosOptionsOpen) {
    photosToRender = queryPhotos;
  }

  // when colors options is open
  if (isColorsOptionsOpen) {
    // set the title
    title = 'Colors';
  } else {
    // find the first 6 colors in the colors object array
    modifiedColors = colors.filter((color, index) => index < 6);
  }

  // when photos options is open
  if (isPhotosOptionsOpen) {
    // set the title
    title = 'Photos by ';
  }

  // when the Board component is rendered and the user wants to
  // change the background image/color
  if (isBoardOpen && latestSixPhotos.length === 0) {
    requestPhotos();
  }

  return (
    <div className="background-options">
      <div className="background-options__header">
        {/* when either the photos options or colors options is open
          then show the left arrow back button */}
        {isPhotosOptionsOpen || isColorsOptionsOpen ? (
          <button
            className="background-options__button"
            type="button"
            onClick={() => {
              if (isPhotosOptionsOpen) {
                // when the photos options is open
                // close it when the user clicks the left arrow back button
                togglePhotosOptions(false);
              }

              if (isColorsOptionsOpen) {
                // when the colors options is open
                // close it when the user clicks the left arrow back button
                toggleColorsOptions(false);
              }

              if (isPhotosOptionsOpen && latestPhotos.length > 0) {
                // empty the latestPhotos array
                // by dipatching an action to the store.
                removePhotos();
              }

              if (isPhotosOptionsOpen && queryPhotos.length > 0) {
                // empty the queryPhotos array
                // by dispatching action to the store.
                removeQPhotos();
              }
            }}
          >
            <i className="fas fa-arrow-left" />
          </button>
        ) : null}
        <span
          className="background-options__title"
          style={
            !isPhotosOptionsOpen && !isColorsOptionsOpen
              ? { marginLeft: '5rem' }
              : {}
          }
        >
          {isPhotosOptionsOpen && title}
          {/* when photos optins is open show the unsplash attribution link */}
          {isPhotosOptionsOpen ? (
            <a
              className="unsplash-attribution"
              href="https://unsplash.com/?utm_source=orgello&utm_medium=referral&utm_campaign=api-credit"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>
          ) : (
            title
          )}
        </span>
        <button
          className="background-options__button"
          type="button"
          onClick={() => {
            // close the background options menu when user clicks close button
            changeBackOptions(!isBackgroundOptionsOpen);
          }}
        >
          <i className="fas fa-times" />
        </button>
      </div>
      <div
        className="grid-container"
        ref={scrollRef}
        onScroll={() => {
          if (
            isPhotosOptionsOpen &&
            scrollRef.current.scrollTop + scrollRef.current.offsetHeight >=
              scrollRef.current.scrollHeight - 200
          ) {
            // when the user scrolls down enough then
            // dispatch action to get more photos and render
            // them on the page.
            if (queryPhotos.length > 0) {
              requestSearchPhotos();
              // same as above for latestPhotos
            } else if (latestPhotos.length > 0) {
              requestPhotos();
            }
          }
        }}
      >
        {/* render the photos when colors options is closed  */}
        {!isColorsOptionsOpen ? (
          <section className="grid-container__item">
            {/* when neither colors or photos options is open,
                show the 'See more' button */}
            {!isPhotosOptionsOpen ? (
              <div className="item">
                <span className="item__title">Photos</span>
                <button
                  className="item__button"
                  type="button"
                  onClick={() => {
                    togglePhotosOptions(true);
                    requestPhotos();
                  }}
                >
                  See more
                </button>
              </div>
            ) : null}
            {/* when photos options is open render the view */}
            {isPhotosOptionsOpen && (
              <div className="search">
                <input
                  className="search__input"
                  type="text"
                  placeholder="Photos"
                  ref={searchRef}
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      changePhotosSearchTerm(e.target.value);
                      // empty the queryPhotos array when the user
                      // types another letter
                      removeQPhotos();
                      // populate the array with the new images
                      requestSearchPhotos();
                      photosToRender = queryPhotos;
                    } else {
                      // when the search input in empty
                      // remove the queryPhotos to show the
                      // latestPhotos instead
                      removeQPhotos();
                      changePhotosSearchTerm('');
                      photosToRender = latestPhotos;
                    }
                  }}
                />
                <span className="photos-search-icon">
                  <i className="fas fa-search" />
                </span>
              </div>
            )}
            <ul
              className="item-list"
              style={isPhotosOptionsOpen ? { marginTop: '1rem' } : {}}
            >
              {photosToRender.map((image) => {
                if (!photoId) {
                  changePhotoId(image.id);
                }
                return (
                  <li
                    key={image.id}
                    className="item-list__item photos-item"
                    style={{ backgroundImage: `url(${image.urls.thumb})` }}
                    onClick={() => {
                      // when the user is on the Board component and
                      // wants to change the background image
                      // make sure not to change the board background when
                      // the user is creating a new board.
                      if (isBoardOpen && !isCreateBoardFormOpen) {
                        changeActiveBackground(`url(${image.urls.regular})`);
                        requestNewBoardBackground({
                          id: boardId,
                          background: `url(${image.urls.regular})`,
                        });
                        // trigger a download when the user changes
                        // the board backgroud image
                        triggerPhotoDownload(photoId);
                      } else {
                        changeBoardBackground({
                          backgroundImage: {
                            thumbnail: `url(${image.urls.thumb})`,
                            regular: `url(${image.urls.regular})`,
                          },
                        });
                      }
                    }}
                  >
                    {/* render the checkmark if image and background match */}
                    {boardBackgroundKey === 'backgroundImage' &&
                    boardBackgroundValue === `url(${image.urls.thumb})` ? (
                      <i className="fas fa-check" />
                    ) : null}
                    <a
                      className="list-item__link"
                      href={`${image.user.links.html}?utm_source=orgello&utm_medium=referral&utm_campaign=api-credit`}
                      title={`${image.user.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {image.user.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
        {/* render colors when photos optinos is closed */}
        {!isPhotosOptionsOpen ? (
          <section className="grid-container__item">
            {/* render 'See more' button when neither colors nor photos
                options is open */}
            {!isColorsOptionsOpen ? (
              <div className="item">
                <span className="item__title">Colors</span>
                <button
                  className="item__button"
                  type="button"
                  onClick={() => toggleColorsOptions(true)}
                >
                  See more
                </button>
              </div>
            ) : null}
            <ul
              className="item-list"
              style={isColorsOptionsOpen ? { marginTop: '1rem' } : {}}
            >
              {modifiedColors.map((color) => (
                <li
                  key={color.id}
                  className="item-list__item colors-item"
                  style={{ backgroundColor: `${color.value}` }}
                  onClick={() => {
                    // change the background when the user is in the
                    // Board component
                    if (isBoardOpen && !isCreateBoardFormOpen) {
                      changeActiveBackground(`${color.value}`);
                      requestNewBoardBackground({
                        id: boardId,
                        background: `${color.value}`,
                      });
                    } else {
                      changeBoardBackground({
                        backgroundColor: `${color.value}`,
                      });
                    }
                  }}
                >
                  {/* render checkmark if color matches background */}
                  {boardBackgroundKey === 'backgroundColor' &&
                  boardBackgroundValue === `${color.value}` ? (
                    <i className="fas fa-check" />
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
};

// prop validation
// it will probably be better to have creatBoard in props
// rather than every property
BackgroundOptions.propTypes = {
  isBackgroundOptionsOpen: PropTypes.bool.isRequired,
  changeBackOptions: PropTypes.func.isRequired,
  currentCreateBoardBackground: PropTypes.shape().isRequired,
  changeBoardBackground: PropTypes.func.isRequired,
  latestSixPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
  latestPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
  requestPhotos: PropTypes.func.isRequired,
  removePhotos: PropTypes.func.isRequired,
  changePhotosSearchTerm: PropTypes.func.isRequired,
  requestSearchPhotos: PropTypes.func.isRequired,
  queryPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeQPhotos: PropTypes.func.isRequired,
  isBoardOpen: PropTypes.bool.isRequired,
  changeActiveBackground: PropTypes.func.isRequired,
  requestNewBoardBackground: PropTypes.func.isRequired,
  boardId: PropTypes.number,
  isCreateBoardFormOpen: PropTypes.bool.isRequired,
};

BackgroundOptions.defaultProps = {
  boardId: 0,
};

// object passed as props to component
// that contains the requested state
const mapStateToProps = (state) => ({
  isBackgroundOptionsOpen: state.createBoard.isBackgroundOptionsOpen,
  currentCreateBoardBackground: state.createBoard.currentBackground,
  latestSixPhotos: state.createBoard.latestSixPhotos,
  latestPhotos: state.createBoard.latestPhotos.photos,
  queryPhotos: state.createBoard.queryPhotos.photos,
  isBoardOpen: state.board.isOpen,
  boardId: state.board.id,
  isCreateBoardFormOpen: state.createBoard.isFormOpen,
});

// object passed as props to component
// that contains actions that are dispatched to change state
const mapDispatchToProps = (dispatch) => ({
  changeBackOptions: (newStatus) =>
    dispatch(changeBackgroundOptions(newStatus)),
  changeBoardBackground: (newCreateBoardBackground) =>
    dispatch(changeCreateBoardBackground(newCreateBoardBackground)),
  requestPhotos: () => dispatch(requestLatestPhotos()),
  removePhotos: () => dispatch(removeLatestPhotos()),
  changePhotosSearchTerm: (searchTerm) =>
    dispatch(changeQueryPhotosSearchTerm(searchTerm)),
  requestSearchPhotos: () => dispatch(requestQueryPhotos()),
  removeQPhotos: () => dispatch(removeQueryPhotos()),
  changeActiveBackground: (newBackground) =>
    dispatch(changeActiveBoardBackground(newBackground)),
  requestNewBoardBackground: (newBackground) =>
    dispatch(requestBoardBackgroundChange(newBackground)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundOptions);
