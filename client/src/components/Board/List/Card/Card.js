import React from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

// implement PureComponent with React.memo by passing it a function
const Card = React.memo(({ card }) => {
  return <div className="card">{card.title}</div>;
});

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    listId: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
