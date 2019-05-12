import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BoardsList from './BoardsList/BoardsList';

import { clearBoardInformation } from '../../actions/board';

import './Dashboard.scss';

const Dashboard = ({ history, user, board, clearBoard }) => {
  if (!user.isLoggedIn) {
    // if user isn't logged in then
    // redirect them to the landing page
    history.replace('/');
  }

  // clear the background if there is one
  if (board.background) {
    clearBoard();
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
      <section className="container">
        <BoardsList />
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
  board: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  clearBoard: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  user: {
    isLoggedIn: false,
  },
};

const mapStateToProps = (state) => ({
  user: state.user,
  board: state.board,
});

const mapDispatchToProps = (dispatch) => ({
  clearBoard: () => dispatch(clearBoardInformation()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
