import {
  LOGIN_USER,
  LOGOUT_USER,
  REQUEST_USERS_BOARDS,
  RECEIVED_USERS_BOARDS,
} from '../constants';

export const loginUser = (userInfo) => ({
  type: LOGIN_USER,
  userInfo,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const requestUsersBoards = () => ({
  type: REQUEST_USERS_BOARDS,
});

export const receivedUsersBoards = (boards) => ({
  type: RECEIVED_USERS_BOARDS,
  boards,
});
