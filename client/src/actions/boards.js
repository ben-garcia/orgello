import {
  CHANGE_CREATE_BOARD_FORM_STATUS,
  CHANGE_CREATE_BOARD_BACKGROUND,
  REQUEST_LATEST_SIX_PHOTOS,
  RECEIVED_LATEST_SIX_PHOTOS,
} from '../constants';

export const changeCreateBoardFormStatus = (isCreateBoardFormOpen) => ({
  type: CHANGE_CREATE_BOARD_FORM_STATUS,
  payload: isCreateBoardFormOpen,
});

export const changeCreateBoardBackground = (newCreateBoardBackground) => ({
  type: CHANGE_CREATE_BOARD_BACKGROUND,
  payload: newCreateBoardBackground,
});

export const requestLatestSixPhotos = () => ({
  type: REQUEST_LATEST_SIX_PHOTOS,
});

export const receivedLatestSixPhotos = (data) => ({
  type: RECEIVED_LATEST_SIX_PHOTOS,
  data,
});
