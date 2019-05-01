import {
  OPEN_BOARD,
  CLOSE_BOARD,
  GET_BOARD_INFO,
  CHANGE_ACTIVE_BOARD_BACKGROUND,
  REQUEST_BOARD_TITLE_CHANGE,
  RECEIVED_BOARD_TITLE_CHANGE,
  REQUEST_BOARD_BACKGROUND_CHANGE,
  RECEIVED_BOARD_BACKGROUND_CHANGE,
} from '../constants';

export const openBoard = () => ({
  type: OPEN_BOARD,
});

export const closeBoard = () => ({
  type: CLOSE_BOARD,
});

export const getBoardInfo = (info) => ({
  type: GET_BOARD_INFO,
  info,
});

export const changeActiveBoardBackground = (newBackground) => ({
  type: CHANGE_ACTIVE_BOARD_BACKGROUND,
  newBackground,
});

export const requestBoardTitleChange = (payload) => ({
  type: REQUEST_BOARD_TITLE_CHANGE,
  payload,
});

export const receivedBoardTitleChange = (newTitle) => ({
  type: RECEIVED_BOARD_TITLE_CHANGE,
  newTitle,
});

export const requestBoardBackgroundChange = (payload) => ({
  type: REQUEST_BOARD_BACKGROUND_CHANGE,
  payload,
});

export const receivedBoardBackgroundChange = (newBackground) => ({
  type: RECEIVED_BOARD_BACKGROUND_CHANGE,
  newBackground,
});
