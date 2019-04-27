import { LOGIN_USER, LOGOUT_USER } from '../constants';

export const loginUser = (userInfo) => ({
  type: LOGIN_USER,
  userInfo,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
