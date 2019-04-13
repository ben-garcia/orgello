import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => (
  <header className="header">
    <nav className="nav">
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
  </header>
);

export default Navbar;
