import {
  CHANGE_CREATE_BOARD_FORM_STATUS,
  CHANGE_CREATE_BOARD_BACKGROUND,
} from '../constants';

export const changeCreateBoardFormStatus = (isCreateBoardFormOpen) => ({
  type: CHANGE_CREATE_BOARD_FORM_STATUS,
  payload: isCreateBoardFormOpen,
});

export const changeCreateBoardBackground = (newCreateBoardBackground) => ({
  type: CHANGE_CREATE_BOARD_BACKGROUND,
  payload: newCreateBoardBackground,
});
