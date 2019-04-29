import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser, requestUsersBoards } from '../../actions/users';
import { getBoardInfo } from '../../actions/board';

import './Board.scss';

const Board = ({
  history,
  location,
  login,
  usersBoards,
  isUserLoggedIn,
  requestAllUsersBoards,
  isBoardOpen,
  getBoardInformation,
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
    if (!usersBoards) {
      requestAllUsersBoards();
    }
    if (!isBoardOpen) {
      getBoardInformation(location.state);
    }
  } else {
    history.replace('/login');
  }

  return (
    <section className="board">
      <div>
        <div className="board__title">{location.state.boardTitle}</div>
      </div>
      <div className="board-container" />
    </section>
  );
};

Board.propTypes = {
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
    }).isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
  usersBoards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      background: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  requestAllUsersBoards: PropTypes.func.isRequired,
  isBoardOpen: PropTypes.bool.isRequired,
  getBoardInformation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.user.isLoggedIn,
  usersBoards: state.user.boards,
  isBoardOpen: state.board.isOpen,
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
