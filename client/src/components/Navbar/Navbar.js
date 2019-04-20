import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Navbar.scss';

const Navbar = ({ isUserLoggedIn }) => (
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
            <i className="fas fa-home" />
          </li>
          <li className="nav__item nav__item--border">
            <i className="fab fa-trello" />
            <span className="icon-text">Boards</span>
          </li>
        </ul>
        <Link className="nav__logo" to="/">
          Orgello
        </Link>
        <ul className="nav__inner">
          <li className="nav__item nav__item--border">
            <i className="fas fa-plus" />
          </li>
          <li className="nav__item user-icon">
            <i className="far fa-user" />
          </li>
        </ul>
      </nav>
    )}
  </header>
);

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
