import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import changeUserLoggedInStatus from '../../actions/users';

import './Dashboard.scss';

const Dashboard = ({ history, changeUserLoggedStatus }) => {
  const user = localStorage.getItem('user');
  if (user) {
    // if user isn't logged in then
    // they shouldn't have access to the dashboard
    // set the dispatch isUserLoggedStatus(true)
    changeUserLoggedStatus(true);
  } else {
    // if user isn't logged in then
    // redirect them to the landing page
    history.push('/');
  }
  return (
    <section className="dashboard">
      <section className="dashboard__inner">
        <ul className="dashboard__nav">
          <li className="dashboard__link">
            <i className="fab fa-trello" />
            <span className="icon-text">Boards</span>
          </li>
          <li className="dashboard__link">
            <i className="far fa-user" />
            <span className="icon-text">Profile</span>
          </li>
          <li className="dashboard__link">
            <i className="fas fa-cog" />
            <span className="icon-text">Settings</span>
          </li>
        </ul>
      </section>
      <section className="boards">
        <ul className="boards__inner">
          <li className="boards__item">
            <span>Create a Board</span>
          </li>
        </ul>
      </section>
    </section>
  );
};

Dashboard.propTypes = {
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
)(Dashboard);
