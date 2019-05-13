import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BoardsDrawer from './BoardsDrawer/BoardsDrawer';
import CreateBoardForm from './CreateBoardForm/CreateBoardForm';
import UserDrawer from './UserDrawer/UserDrawer';
import { changeCreateBoardFormStatus } from '../../actions/boards';
import { closeBoard } from '../../actions/board';
import {
  openBoardsDrawer,
  closeBoardsDrawer,
} from '../../actions/boardsDrawer';
import { openUserDrawer, closeUserDrawer } from '../../actions/userDrawer';

import './Navbar.scss';

const Navbar = ({
  isUserLoggedIn,
  isCreateBoardFormOpen,
  changeBoardFormStatus,
  isBoardOpen,
  closeBoardPage,
  boardsDrawerIsOpen,
  openBoardDrawer,
  closeBoardDrawer,
  userDrawerIsOpen,
  openUsersDrawer,
  closeUsersDrawer,
}) => {
  return (
    <header
      className="header"
      style={isBoardOpen ? { background: 'transparent' } : {}}
    >
      {!isUserLoggedIn ? (
        <nav className="nav nav--logged-out">
          <Link className="nav__logo" to="/">
            Orgello
          </Link>
          <ul className="nav__inner">
            <li className="nav__item">
              <Link className="nav__link" to="/login">
                Log In
              </Link>
            </li>
            <li className="nav__item">
              <Link className="button button--white" to="signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="nav nav--logged-in">
          <ul className="nav__inner">
            <li className="nav__item nav__item--border">
              <Link to="/" onClick={() => closeBoardPage()}>
                <i className="fas fa-home" />
              </Link>
            </li>
            <li className="nav__item nav__item--border">
              <button
                className="nav__button"
                onClick={() => {
                  if (boardsDrawerIsOpen) {
                    closeBoardDrawer();
                  } else {
                    openBoardDrawer();
                  }
                }}
                type="button"
              >
                <i className="fab fa-trello" />
                <span className="icon-text">Boards</span>
              </button>
            </li>
          </ul>
          <Link className="nav__logo" to="/">
            Orgello
          </Link>
          <ul className="nav__inner">
            <li className="nav__item nav__item--border">
              <button
                className="nav__button"
                onClick={() => changeBoardFormStatus(!isCreateBoardFormOpen)}
                type="button"
              >
                <i className="fas fa-plus" />
              </button>
            </li>
            <li className="nav__item user-icon">
              <button
                className="nav__button"
                onClick={() => {
                  if (userDrawerIsOpen) {
                    closeUsersDrawer();
                  } else {
                    openUsersDrawer();
                  }
                }}
                type="button"
              >
                <i className="far fa-user" />
              </button>
            </li>
          </ul>
        </nav>
      )}
      {boardsDrawerIsOpen ? <BoardsDrawer /> : null}
      {isCreateBoardFormOpen ? <CreateBoardForm /> : null}
      {userDrawerIsOpen ? <UserDrawer /> : null}
    </header>
  );
};

Navbar.propTypes = {
  isUserLoggedIn: PropTypes.bool,
  isCreateBoardFormOpen: PropTypes.bool.isRequired,
  changeBoardFormStatus: PropTypes.func.isRequired,
  isBoardOpen: PropTypes.bool.isRequired,
  closeBoardPage: PropTypes.func.isRequired,
  boardsDrawerIsOpen: PropTypes.bool.isRequired,
  openBoardDrawer: PropTypes.func.isRequired,
  closeBoardDrawer: PropTypes.func.isRequired,
  userDrawerIsOpen: PropTypes.bool.isRequired,
  openUsersDrawer: PropTypes.func.isRequired,
  closeUsersDrawer: PropTypes.func.isRequired,
};

// getting a 'isUserLoggedIn' is initially 'undefined'
Navbar.defaultProps = {
  isUserLoggedIn: false,
};

// function that takes the state from the store and
// returns an object with the property that will contain
// the isLoggedIn property from the user object.
const mapStateToProps = (state) => ({
  isUserLoggedIn: state.user.isLoggedIn,
  isCreateBoardFormOpen: state.createBoard.isFormOpen,
  isBoardOpen: state.board.isOpen,
  boardsDrawerIsOpen: state.boardsDrawer.isOpen,
  userDrawerIsOpen: state.userDrawer.isOpen,
});

// function that takes dispatch(method that redux uses to
// send an action the the store)
// returns an object whose property is the found in props
// and value is the method used to change the state of isCreateBoardFormOpen.
const mapDispatchToProps = (dispatch) => ({
  changeBoardFormStatus: (status) =>
    dispatch(changeCreateBoardFormStatus(status)),
  closeBoardPage: () => dispatch(closeBoard()),
  openBoardDrawer: () => dispatch(openBoardsDrawer()),
  closeBoardDrawer: () => dispatch(closeBoardsDrawer()),
  openUsersDrawer: () => dispatch(openUserDrawer()),
  closeUsersDrawer: () => dispatch(closeUserDrawer()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
