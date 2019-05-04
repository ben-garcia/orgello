import React from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

const Card = ({ title }) => {
  return <div className="card">{title}</div>;
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Card;
