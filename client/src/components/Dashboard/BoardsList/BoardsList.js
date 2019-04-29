import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeCreateBoardFormStatus } from '../../../actions/boards';

import './BoardsList.scss';

const BoardsList = ({ usersBoards, changeBoardFormStatus }) => {
  return (
    <section className="boards">
      <div className="boards__header">
        <span className="boards__logo">
          <i className="far fa-user" />
        </span>
        <h3 className="boards__title">All Boards</h3>
      </div>
      <ul className="boards__list">
        {usersBoards &&
          usersBoards.map((board) => (
            <li
              key={board.id}
              className="boards__item"
              style={
                board.background[0] === 'u'
                  ? {
                      backgroundImage: board.background,
                      backgroundSize: 'cover',
                      backgroundPosition: '50%',
                    }
                  : { backgroundColor: board.background }
              }
            >
              <Link to={`/board/${board.title}`} className="board__link">
                <span className="board__title">{board.title}</span>
              </Link>
            </li>
          ))}
        <button
          className="create-board-button"
          type="button"
          onClick={() => changeBoardFormStatus(true)}
        >
          <span>Create a Board</span>
        </button>
      </ul>
    </section>
  );
};

BoardsList.propTypes = {
  usersBoards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      background: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }).isRequired
  ),
  changeBoardFormStatus: PropTypes.func.isRequired,
};

BoardsList.defaultProps = {
  usersBoards: [],
};

const mapStateToProps = (state) => ({
  usersBoards: state.user.boards,
});

const mapDispatchToProps = (dispatch) => ({
  changeBoardFormStatus: (status) =>
    dispatch(changeCreateBoardFormStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsList);
