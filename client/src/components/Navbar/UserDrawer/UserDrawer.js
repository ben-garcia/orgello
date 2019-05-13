import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logoutUser } from '../../../actions/users';

import './UserDrawer.scss';

const UserDrawer = ({ history, username, logUserOut }) => {
  const logout = () => {
    localStorage.clear();
    history.replace('/');
  };

  return (
    <div className="user-drawer">
      <div className="user-drawer__name">{username}</div>
      <button
        className="logout-button"
        type="button"
        onClick={() => {
          // dispatch action to clear user info
          logUserOut();
          logout();
        }}
      >
        Log Out
      </button>
    </div>
  );
};

UserDrawer.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
  logUserOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  logUserOut: () => dispatch(logoutUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserDrawer));
