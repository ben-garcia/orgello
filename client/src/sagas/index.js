import { takeLatest } from 'redux-saga/effects';

import {
  REQUEST_USERS_BOARDS,
  REQUEST_LATEST_SIX_PHOTOS,
  REQUEST_LATEST_PHOTOS,
  REQUEST_QUERY_PHOTOS,
  REQUEST_BOARD_TITLE_CHANGE,
  REQUEST_BOARD_BACKGROUND_CHANGE,
  REQUEST_BOARD_INFORMATION,
  REQUEST_CREATE_LIST,
  REQUEST_UPDATE_LIST_TITLE,
  REQUEST_CREATE_CARD,
  REQUEST_UPDATE_CARD_TITLE,
} from '../constants';
import getAllUsersBoards from './users';
import { getLatestSixPhotos, getLatestPhotos, getQueryPhotos } from './boards';
import {
  updateBoardTitle,
  updateBoardBackground,
  getBoardInformation,
} from './board';
import { createList, updateList } from './lists';
import { createCard, updateCard } from './cards';

export default function* rootSaga() {
  // takeLatest effect takes the latest action dispatched
  // if two actions are fired one after another, the last action will fire
  // while the first is canceled
  yield takeLatest(REQUEST_USERS_BOARDS, getAllUsersBoards);
  yield takeLatest(REQUEST_LATEST_SIX_PHOTOS, getLatestSixPhotos);
  yield takeLatest(REQUEST_LATEST_PHOTOS, getLatestPhotos);
  yield takeLatest(REQUEST_QUERY_PHOTOS, getQueryPhotos);
  yield takeLatest(REQUEST_BOARD_TITLE_CHANGE, updateBoardTitle);
  yield takeLatest(REQUEST_BOARD_BACKGROUND_CHANGE, updateBoardBackground);
  yield takeLatest(REQUEST_BOARD_INFORMATION, getBoardInformation);
  yield takeLatest(REQUEST_CREATE_LIST, createList);
  yield takeLatest(REQUEST_UPDATE_LIST_TITLE, updateList);
  yield takeLatest(REQUEST_CREATE_CARD, createCard);
  yield takeLatest(REQUEST_UPDATE_CARD_TITLE, updateCard);
}
