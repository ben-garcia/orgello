import React from 'react';

import './Dashboard.scss';

const Dashboard = ({ history }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    // if user isn't logged in then
    // they shouldn't have access to the dashboard
    // redirect to landing page.
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

export default Dashboard;
