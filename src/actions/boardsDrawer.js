import { OPEN_BOARDS_DRAWER, CLOSE_BOARDS_DRAWER } from '../constants';

export const openBoardsDrawer = () => ({
  type: OPEN_BOARDS_DRAWER,
});

export const closeBoardsDrawer = () => ({
  type: CLOSE_BOARDS_DRAWER,
});
