import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BoardsDrawer from './BoardsDrawer/BoardsDrawer';
import UserDrawer from './UserDrawer/UserDrawer';

import './Navbar.scss';

const Navbar = ({ isUserLoggedIn }) => {
  const [boardsDrawerIsOpen, toggleBoardsDrawer] = useState(false);
  const [createBoardIsOpen, toggleCreateBoard] = useState(false);
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
                onClick={() => toggleCreateBoard(!createBoardIsOpen)}
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
      {userDrawerIsOpen ? <UserDrawer /> : null}
    </header>
  );
};

Navbar.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
};

// function that takes the state from the store and
// returns an object with the property that will contain
// the isLoggedIn property from the user object.
const mapStateToProps = (state) => ({
  isUserLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Navbar);
