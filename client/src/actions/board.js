import {
  OPEN_BOARD,
  CLOSE_BOARD,
  GET_BOARD_INFO,
  CHANGE_ACTIVE_BOARD_BACKGROUND,
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
