import {
  CHANGE_CREATE_BOARD_FORM_STATUS,
  CHANGE_BACKGROUND_OPTIONS,
  CHANGE_CREATE_BOARD_TITLE,
  CHANGE_CREATE_BOARD_BACKGROUND,
  REQUEST_LATEST_SIX_PHOTOS,
  RECEIVED_LATEST_SIX_PHOTOS,
  REQUEST_LATEST_PHOTOS,
  RECEIVED_LATEST_PHOTOS,
  REMOVE_LATEST_PHOTOS,
  REQUEST_QUERY_PHOTOS,
  RECEIVED_QUERY_PHOTOS,
  CHANGE_QUERY_PHOTOS_SEARCH_TERM,
  REMOVE_QUERY_PHOTOS,
} from '../constants';

export const changeCreateBoardFormStatus = (isCreateBoardFormOpen) => ({
  type: CHANGE_CREATE_BOARD_FORM_STATUS,
  payload: isCreateBoardFormOpen,
});

export const changeBackgroundOptions = (newStatus) => ({
  type: CHANGE_BACKGROUND_OPTIONS,
  newStatus,
});

export const changeCreateBoardTitle = (newTitle) => ({
  type: CHANGE_CREATE_BOARD_TITLE,
  newTitle,
});

export const changeCreateBoardBackground = (newCreateBoardBackground) => ({
  type: CHANGE_CREATE_BOARD_BACKGROUND,
  newCreateBoardBackground,
});

export const requestLatestSixPhotos = () => ({
  type: REQUEST_LATEST_SIX_PHOTOS,
});

export const receivedLatestSixPhotos = (data) => ({
  type: RECEIVED_LATEST_SIX_PHOTOS,
  data,
});

export const requestLatestPhotos = () => ({
  type: REQUEST_LATEST_PHOTOS,
});

export const receivedLatestPhotos = (latestPhotos) => ({
  type: RECEIVED_LATEST_PHOTOS,
  latestPhotos,
});

export const removeLatestPhotos = () => ({
  type: REMOVE_LATEST_PHOTOS,
});

export const requestQueryPhotos = () => ({
  type: REQUEST_QUERY_PHOTOS,
});

export const receivedQueryPhotos = (queryPhotos) => ({
  type: RECEIVED_QUERY_PHOTOS,
  queryPhotos,
});

export const changeQueryPhotosSearchTerm = (searchTerm) => ({
  type: CHANGE_QUERY_PHOTOS_SEARCH_TERM,
  searchTerm,
});

export const removeQueryPhotos = () => ({
  type: REMOVE_QUERY_PHOTOS,
});
