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
    <div className="dashboard">
      <div className="container">
        <BoardsList />
      </div>
    </div>
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
