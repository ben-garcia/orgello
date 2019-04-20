import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import changeUserLoggedInStatus from '../../actions/users';

import './LandingPage.scss';

const LandingPage = ({ history, changeUserLoggedStatus }) => {
  let user = localStorage.getItem('user');
  if (user) {
    // parse the user object
    user = JSON.parse(user);
    // if the user is stored in localStorage then
    // set the dispatch isUserLoggedInStatus(true)
    changeUserLoggedStatus(true);
    // redirect the user to their dashboard
    history.push(`${user.username}/dashboard`);
  }

  return (
    <section className="hero">
      <h1 className="hero__title">Welcome to Orgello</h1>
      <p className="hero__text">
        Orgello is a miniature clone of
        <a className="hero__link" href="https://trello.com/">
          Trello
        </a>
        that supports Boards, Lists, and Cards.
      </p>
      <Link className="hero__cta" to="/signup">
        Sign Up Now
      </Link>
    </section>
  );
};

LandingPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  changeUserLoggedStatus: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  changeUserLoggedStatus: (status) =>
    dispatch(changeUserLoggedInStatus(status)),
});

export default connect(
  null,
  mapDispatchToProps
)(LandingPage);
