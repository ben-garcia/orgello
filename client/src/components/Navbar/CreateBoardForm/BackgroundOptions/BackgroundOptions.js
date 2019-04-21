import React from 'react';

import './BackgroundOptions.scss';

const BackgroundOptions = () => (
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
        <li className="photos__item">
          <span className="photos__link" />
        </li>
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
        <li className="colors__item">
          <span className="colors__link" />
        </li>
      </ul>
    </section>
  </div>
);

export default BackgroundOptions;
