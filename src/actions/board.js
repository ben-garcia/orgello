import {
  OPEN_BOARD,
  CLOSE_BOARD,
  GET_BOARD_INFO,
  CHANGE_ACTIVE_BOARD_BACKGROUND,
  CLEAR_BOARD_INFORMATION,
  REQUEST_BOARD_TITLE_CHANGE,
  RECEIVED_BOARD_TITLE_CHANGE,
  REQUEST_BOARD_BACKGROUND_CHANGE,
  RECEIVED_BOARD_BACKGROUND_CHANGE,
  REQUEST_BOARD_INFORMATION,
  RECEIVED_BOARD_INFORMATION,
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

export const clearBoardInformation = () => ({
  type: CLEAR_BOARD_INFORMATION,
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

export const requestBoardInformation = (board) => ({
  type: REQUEST_BOARD_INFORMATION,
  board,
});

export const receivedBoardInformation = (boardInfo) => ({
  type: RECEIVED_BOARD_INFORMATION,
  boardInfo,
});
