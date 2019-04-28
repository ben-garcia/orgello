import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Dashboard.scss';

const Dashboard = ({ history, user }) => {
  if (!user.isLoggedIn) {
    // if user isn't logged in then
    // redirect them to the landing page
    history.replace('/');
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
    replace: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    id: PropTypes.number,
    email: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};

Dashboard.defaultProps = {
  user: {
    isLoggedIn: false,
  },
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Dashboard);
