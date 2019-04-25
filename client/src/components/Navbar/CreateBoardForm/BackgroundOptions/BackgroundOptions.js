/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  changeCreateBoardBackground,
  requestLatestPhotos,
  removeLatestPhotos,
  changeQueryPhotosSearchTerm,
  requestQueryPhotos,
} from '../../../../actions/boards';

import colors from '../../../../api/colors';

import './BackgroundOptions.scss';

const BackgroundOptions = ({
  currentCreateBoardBackground,
  changeBoardBackground,
  latestSixPhotos,
  latestPhotos,
  removePhotos,
  requestPhotos,
  changePhotosSearchTerm,
  requestSearchPhotos,
  queryPhotos,
}) => {
  const [isColorsOptionsOpen, toggleColorsOptions] = useState(false);
  const [isPhotosOptionsOpen, togglePhotosOptions] = useState(false);

  // this reference is used to change the position of the scrollbar after
  // a new batch of images have been rendered.
  const scrollRef = useRef(null);
  // reference for the search input field in the photos options
  const searchRef = useRef(null);

  // check the height of the grid container
  // at present this effect is called every render
  useEffect(() => {
    if (
      isPhotosOptionsOpen &&
      scrollRef.current.offsetHeight >= 502 &&
      latestPhotos.length >= 18 &&
      latestPhotos.length <= 54
    ) {
      requestPhotos();
    }
  });

  // when PhotosOptions is open
  // search input field should have focus
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [isPhotosOptionsOpen]);

  const boardBackgroundKey = Object.keys(currentCreateBoardBackground)[0];
  const boardBackgroundValue = Object.values(currentCreateBoardBackground)[0];

  let title = 'Board Background';
  let photosToRender = latestSixPhotos;
  let modifiedColors = colors;

  if (latestPhotos.length > 0) {
    photosToRender = latestPhotos;
  } else {
    photosToRender = photosToRender.filter((image, i) => i < 6);
  }

  if (isColorsOptionsOpen) {
    title = 'Colors';
  } else {
    // find the first 6 colors in the colors object array
    modifiedColors = colors.filter((color, index) => index < 6);
  }

  if (isPhotosOptionsOpen) {
    title = 'Photos by ';
  }

  // if queryPhotos array has been populated
  // then render those photos
  if (queryPhotos.length > 0) {
    photosToRender = queryPhotos;
  } else {
    photosToRender = latestPhotos;
  }

  return (
    <div className="background-options">
      <div className="background-options__header">
        {isPhotosOptionsOpen || isColorsOptionsOpen ? (
          <button
            className="background-options__button"
            type="button"
            onClick={() => {
              if (isPhotosOptionsOpen) {
                togglePhotosOptions(false);
              }

              if (isColorsOptionsOpen) {
                toggleColorsOptions(false);
              }

              if (isPhotosOptionsOpen && latestPhotos.length > 0) {
                // empty the latestPhotos array
                removePhotos();
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
        <button className="background-options__button" type="button">
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
              requestQueryPhotos();
            } else {
              requestPhotos();
            }
          }
        }}
      >
        {!isColorsOptionsOpen ? (
          <section className="photos">
            {!isPhotosOptionsOpen ? (
              <div className="photos__header">
                <span className="photos__title">Photos</span>
                <button
                  className="photos__button"
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
            {isPhotosOptionsOpen && (
              <div className="photos__search">
                <input
                  className="photos__input"
                  type="text"
                  placeholder="Photos"
                  ref={searchRef}
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      changePhotosSearchTerm(e.target.value);
                      requestSearchPhotos();
                    }
                  }}
                />
                <span className="photos-search-icon">
                  <i className="fas fa-search" />
                </span>
              </div>
            )}
            <ul
              className="photos__list"
              style={isPhotosOptionsOpen ? { marginTop: '1rem' } : {}}
            >
              {photosToRender.map((image) => (
                <li
                  key={image.id}
                  className="photos__item"
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
                  <a
                    className="photos__link"
                    href={`${
                      image.user.links.html
                    }?utm_source=orgello&utm_medium=referral&utm_campaign=api-credit`}
                    title={`${image.user.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {image.user.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {!isPhotosOptionsOpen ? (
          <section className="colors">
            {!isColorsOptionsOpen ? (
              <div className="colors__header">
                <span className="colors__title">Colors</span>
                <button
                  className="colors__button"
                  type="button"
                  onClick={() => toggleColorsOptions(true)}
                >
                  See more
                </button>
              </div>
            ) : null}
            <ul
              className="colors__list"
              style={isColorsOptionsOpen ? { marginTop: '1rem' } : {}}
            >
              {modifiedColors.map((color) => (
                <li
                  key={color.id}
                  className="colors__item"
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
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
};

BackgroundOptions.propTypes = {
  currentCreateBoardBackground: PropTypes.shape().isRequired,
  changeBoardBackground: PropTypes.func.isRequired,
  latestSixPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
  latestPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
  requestPhotos: PropTypes.func.isRequired,
  removePhotos: PropTypes.func.isRequired,
  changePhotosSearchTerm: PropTypes.func.isRequired,
  requestSearchPhotos: PropTypes.func.isRequired,
  queryPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  currentCreateBoardBackground: state.createBoard.currentBackground,
  latestSixPhotos: state.createBoard.latestSixPhotos,
  latestPhotos: state.createBoard.latestPhotos.photos,
  queryPhotos: state.createBoard.queryPhotos.photos,
});

const mapDispatchToProps = (dispatch) => ({
  changeBoardBackground: (newCreateBoardBackground) =>
    dispatch(changeCreateBoardBackground(newCreateBoardBackground)),
  requestPhotos: () => dispatch(requestLatestPhotos()),
  removePhotos: () => dispatch(removeLatestPhotos()),
  changePhotosSearchTerm: (searchTerm) =>
    dispatch(changeQueryPhotosSearchTerm(searchTerm)),
  requestSearchPhotos: () => dispatch(requestQueryPhotos()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundOptions);
