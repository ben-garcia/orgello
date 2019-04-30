import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BackgroundOptions from '../Navbar/CreateBoardForm/BackgroundOptions/BackgroundOptions';

import { loginUser, requestUsersBoards } from '../../actions/users';
import {
  changeBackgroundOptions,
  requestLatestSixPhotos,
} from '../../actions/boards';
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
  isBackgroundOptionsOpen,
  changeBackOptions,
  requestSixPhotos,
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
    }

    // make sure that location.state exists
    // when user clicks on board in the dashboard
    if (!isBoardOpen && location.state) {
      getBoardInformation(location.state);
    }

    // if board has no background property
    // then get the information from the board with the same title
    // in the url
    // NOTE: this will fail when there are two boards with the same title
    // not sure is I should add a unique contraint on board model
    // don't think that would make sense.
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
      <div className="board__background-options">
        {isBackgroundOptionsOpen ? <BackgroundOptions /> : null}
      </div>
      <div className="board__header">
        <input className="board__title" value={title} />
        <button
          className="header-button"
          type="button"
          onClick={() => {
            // dispatch action to fetch latest six photos
            // only if the user clicks the 'Change Background' button
            // better to dispatch the action here then every time
            // the Board renders for the first time
            requestSixPhotos();
            changeBackOptions(!isBackgroundOptionsOpen);
          }}
        >
          Change Background
        </button>
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
  isBackgroundOptionsOpen: PropTypes.bool.isRequired,
  changeBackOptions: PropTypes.func.isRequired,
  requestSixPhotos: PropTypes.func.isRequired,
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
  isBackgroundOptionsOpen: state.createBoard.isBackgroundOptionsOpen,
});

const mapDispatchToProps = (dispatch) => ({
  login: (userInfo) => dispatch(loginUser(userInfo)),
  requestAllUsersBoards: () => dispatch(requestUsersBoards()),
  getBoardInformation: (info) => dispatch(getBoardInfo(info)),
  changeBackOptions: (status) => dispatch(changeBackgroundOptions(status)),
  requestSixPhotos: () => dispatch(requestLatestSixPhotos()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
