import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser, requestUsersBoards } from '../../actions/users';
import { getBoardInfo } from '../../actions/board';

import './Board.scss';

const Board = ({
  match,
  history,
  location,
  login,
  usersBoards,
  isUserLoggedIn,
  requestAllUsersBoards,
  isBoardOpen,
  getBoardInformation,
  board,
}) => {
  let savedUser = localStorage.getItem('user');

  if (savedUser) {
    // parse the user object
    savedUser = JSON.parse(savedUser);
    if (!isUserLoggedIn) {
      // if the user is stored in localStorage then
      // set the dispatch isUserLoggedInStatus(true)
      login({ ...savedUser, isLoggedIn: true });
    }

    if (usersBoards.length === 0) {
      requestAllUsersBoards();

      if (location.state) {
        getBoardInformation(location.state);
      }
    }

    if (!isBoardOpen && location.state) {
      getBoardInformation(location.state);
    }

    if (usersBoards.length > 0 && !board.background) {
      const currentBoard = usersBoards.filter(
        (b) => b.title === match.params.boardTitle
      )[0];

      getBoardInformation(currentBoard);
    }
  } else {
    history.replace('/login');
  }

  const title = location.state ? location.state.title : board.title;

  return (
    <section className="board">
      <div>
        <div className="board__title">{title}</div>
      </div>
      <div className="board-container" />
    </section>
  );
};

Board.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      boardTitle: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      background: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }),
  }),
  login: PropTypes.func.isRequired,
  usersBoards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      background: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    })
  ),
  isUserLoggedIn: PropTypes.bool,
  requestAllUsersBoards: PropTypes.func.isRequired,
  isBoardOpen: PropTypes.bool.isRequired,
  getBoardInformation: PropTypes.func.isRequired,
  board: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    background: PropTypes.string,
  }),
};

Board.defaultProps = {
  isUserLoggedIn: false,
  board: [],
  location: {},
  usersBoards: [],
};

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.user.isLoggedIn,
  usersBoards: state.user.boards,
  isBoardOpen: state.board.isOpen,
  board: state.board,
});

const mapDispatchToProps = (dispatch) => ({
  login: (userInfo) => dispatch(loginUser(userInfo)),
  requestAllUsersBoards: () => dispatch(requestUsersBoards()),
  getBoardInformation: (info) => dispatch(getBoardInfo(info)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
