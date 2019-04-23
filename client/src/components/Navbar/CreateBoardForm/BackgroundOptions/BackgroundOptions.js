/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeCreateBoardBackground } from '../../../../actions/boards';

import colors from '../../../../api/colors';

import './BackgroundOptions.scss';

const BackgroundOptions = ({
  currentCreateBoardBackground,
  changeBoardBackground,
  latestSixPhotos,
}) => {
  const [isColorsOptionsOpen, toggleColorsOptions] = useState(false);
  const [isPhotosOptionsOpen, togglePhotosOptions] = useState(false);

  const boardBackgroundKey = Object.keys(currentCreateBoardBackground)[0];
  const boardBackgroundValue = Object.values(currentCreateBoardBackground)[0];

  let title = 'Board Background';
  let modifiedColors = colors;

  if (isColorsOptionsOpen) {
    title = 'Colors';
  } else {
    // render the first six colors
    modifiedColors = colors.filter((color, index) => index < 6);
  }

  if (isPhotosOptionsOpen) {
    title = 'Photos';
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
            }}
          >
            <i className="fas fa-arrow-left" />
          </button>
        ) : null}
        {/* <span className="background-options__title">{title}</span> */}
        <span
          className="background-options__title"
          style={
            !isPhotosOptionsOpen && !isColorsOptionsOpen
              ? { marginLeft: '5rem' }
              : {}
          }
        >
          {title}
        </span>
        <button className="background-options__button" type="button">
          <i className="fas fa-times" />
        </button>
      </div>
      {!isColorsOptionsOpen ? (
        <section className="photos">
          {!isPhotosOptionsOpen ? (
            <div className="photos__header">
              <span className="photos__title">Photos</span>
              <button
                className="photos__button"
                type="button"
                onClick={() => togglePhotosOptions(true)}
              >
                See more
              </button>
            </div>
          ) : null}
          <ul
            className="photos__list"
            style={isPhotosOptionsOpen ? { marginTop: '1rem' } : {}}
          >
            {latestSixPhotos
              .filter((image, i) => i < 6)
              .map((image) => (
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
  );
};

BackgroundOptions.propTypes = {
  currentCreateBoardBackground: PropTypes.shape().isRequired,
  changeBoardBackground: PropTypes.func.isRequired,
  latestSixPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  currentCreateBoardBackground: state.createBoard.currentBackground,
  latestSixPhotos: state.createBoard.latestSixPhotos,
});

const mapDispatchToProps = (dispatch) => ({
  changeBoardBackground: (newCreateBoardBackground) =>
    dispatch(changeCreateBoardBackground(newCreateBoardBackground)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundOptions);
