import { CHANGE_USER_LOGGED_IN_STATUS } from '../constants';

const changeUserLoggedInStatus = (isUserLoggedIn) => ({
  type: CHANGE_USER_LOGGED_IN_STATUS,
  payload: isUserLoggedIn,
});

export default changeUserLoggedInStatus;
