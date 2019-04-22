/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeCreateBoardBackground } from '../../../../actions/boards';

import './BackgroundOptions.scss';

// temporary data
// will be replace with api data from unsplash api
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
  {
    id: 5,
    url:
      'https://images.unsplash.com/photo-1555704832-69016c4bf0c6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9',
  },
  {
    id: 6,
    url:
      'https://images.unsplash.com/photo-1555570371-517b4d4434cb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9',
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
  {
    id: 5,
    value: 'rgb(137, 96, 158)',
  },
  {
    id: 6,
    value: 'rgb(205, 90, 145)',
  },
];

const BackgroundOptions = ({
  currentCreateBoardBackground,
  changeBoardBackground,
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
          {images.map((image) => (
            <li
              key={image.id}
              className="photos__item"
              style={{ backgroundImage: `url(${image.url})` }}
              onClick={() =>
                changeBoardBackground({
                  backgroundImage: `url(${image.url})`,
                })
              }
            >
              {boardBackgroundKey === 'backgroundImage' &&
              boardBackgroundValue === `url(${image.url})` ? (
                <i className="fas fa-check" />
              ) : null}
              <a className="photos__link" href="https://trello.com">
                Profile Page
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
          {colors.map((color) => (
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
};

const mapStateToProps = (state) => ({
  currentCreateBoardBackground: state.createBoard.currentBackground,
});

const mapDispatchToProps = (dispatch) => ({
  changeBoardBackground: (newCreateBoardBackground) =>
    dispatch(changeCreateBoardBackground(newCreateBoardBackground)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundOptions);
