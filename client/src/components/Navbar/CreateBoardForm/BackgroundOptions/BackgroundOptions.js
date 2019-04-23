/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
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
  const boardBackgroundKey = Object.keys(currentCreateBoardBackground)[0];
  const boardBackgroundValue = Object.values(currentCreateBoardBackground)[0];

  return (
    <div className="background-options">
      <div className="background-options__header">
        <span className="background-options__title">Board Background</span>
        <button className="background-options__button" type="button">
          <i className="fas fa-times" />
        </button>
      </div>
      <section className="photos">
        <div className="photos__header">
          <span className="photos__title">Photos</span>
          <button className="photos__button" type="button">
            See more
          </button>
        </div>
        <ul className="photos__list">
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
      <section className="colors">
        <div className="colors__header">
          <span className="colors__title">Colors</span>
          <button className="colors__button" type="button">
            See more
          </button>
        </div>
        <ul className="colors__list">
          {colors
            .filter((c, i) => i < 6)
            .map((color) => (
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
