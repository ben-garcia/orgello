import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BoardsDrawer from './BoardsDrawer/BoardsDrawer';
import CreateBoardForm from './CreateBoardForm/CreateBoardForm';
import UserDrawer from './UserDrawer/UserDrawer';
import { changeCreateBoardFormStatus } from '../../actions/boards';

import './Navbar.scss';

const Navbar = ({
  isUserLoggedIn,
  isCreateBoardFormOpen,
  changeBoardFormStatus,
}) => {
  const [boardsDrawerIsOpen, toggleBoardsDrawer] = useState(false);
  const [userDrawerIsOpen, toggleUserDrawer] = useState(false);

  return (
    <header className="header">
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
              <Link to="/">
                <i className="fas fa-home" />
              </Link>
            </li>
            <li className="nav__item nav__item--border">
              <button
                className="nav__button"
                onClick={() => toggleBoardsDrawer(!boardsDrawerIsOpen)}
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
                onClick={() => toggleUserDrawer(!userDrawerIsOpen)}
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
});

// function that takes dispatch(method that redux uses to
// send an action the the store)
// returns an object whose property is the found in props
// and value is the method used to change the state of isCreateBoardFormOpen.
const mapDispatchToProps = (dispatch) => ({
  changeBoardFormStatus: (status) =>
    dispatch(changeCreateBoardFormStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
