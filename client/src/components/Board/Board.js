import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../actions/users';

import './Board.scss';

const Board = ({ match, history, login }) => {
  let savedUser = localStorage.getItem('user');

  if (savedUser) {
    // parse the user object
    savedUser = JSON.parse(savedUser);
    // if the user is stored in localStorage then
    // set the dispatch isUserLoggedInStatus(true)
    login({ ...savedUser, isLoggedIn: true });
  } else {
    history.replace('/login');
  }

  return (
    <section className="board">
      <div>
        <div className="board__title">{match.params.boardTitle}</div>
      </div>
      <div className="board-container" />
    </section>
  );
};

Board.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      boardTitle: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (userInfo) => dispatch(loginUser(userInfo)),
});

export default connect(
  null,
  mapDispatchToProps
)(Board);
