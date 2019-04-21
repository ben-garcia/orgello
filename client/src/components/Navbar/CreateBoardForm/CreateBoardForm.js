import React, { useState } from 'react';

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

const CreateBoardForm = () => {
  const [isDisabled, toggleDisabledButton] = useState(true);
  return (
    <div className="create-board-form">
      <form className="board-form">
        <div className="board-form__container">
          <div
            className="board-form__inner"
            style={{ backgroundImage: `url(${images[0].url})` }}
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
            <button className="close-button" type="button">
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="background">
            <ul className="background__list">
              {images.map((image) => (
                <li key={image.id} className="background__item">
                  <button
                    className="background__button"
                    type="button"
                    style={{ backgroundImage: `url(${image.url})` }}
                  />
                </li>
              ))}
              {colors.map((color) => (
                <li key={color.id} className="background__item">
                  <button
                    className="background__button"
                    type="button"
                    style={{ backgroundColor: `${color.value}` }}
                  />
                </li>
              ))}
              <li className="background__item">
                <button
                  className="background__button background__button--options"
                  type="button"
                >
                  <i className="fas fa-ellipsis-h" />
                </button>
              </li>
            </ul>
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
  );
};

export default CreateBoardForm;
