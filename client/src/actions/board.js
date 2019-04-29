import { OPEN_BOARD, CLOSE_BOARD, GET_BOARD_INFO } from '../constants';

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
