import { call, put } from 'redux-saga/effects';

import {
  receivedBoardTitleChange,
  receivedBoardBackgroundChange,
  receivedBoardInformation,
} from '../actions/board';
import { updateResource, getBoard } from '../api';

export function* updateBoardTitle({ payload }) {
  try {
    // call effect calls the function passed as first arguement.
    // any other arguments passed are the arguements of the function call passed
    // as the first, which is updatedTitle in this case
    const updatedTitle = yield call(
      updateResource,
      `http://localhost:9000/boards/${payload.id}`,
      { title: payload.title }
    );
    // dispatch an action to the store with put effect
    yield put(receivedBoardTitleChange(updatedTitle));
  } catch (e) {
    console.error('updateBoardTitle() error: ', e.message);
  }
}

export function* updateBoardBackground({ payload }) {
  try {
    // call effect calls the function passed as first arguement.
    // any other arguments passed are the arguements of the function call passed
    // as the first, which is updatedBackground in this case
    const updatedBackground = yield call(
      updateResource,
      `http://localhost:9000/boards/${payload.id}`,
      { background: payload.background }
    );
    // dispatch an action to the store with put effect
    yield put(receivedBoardBackgroundChange(updatedBackground));
  } catch (e) {
    console.error('updateBoardBackground() error: ', e.message);
  }
}

export function* getBoardInformation({ board }) {
  try {
    // call effect calls the function passed as first arguement.
    // any other arguments passed are the arguements of the function call passed
    // as the first, which is getBoard in this case
    const boardInfo = yield call(
      getBoard,
      `http://localhost:9000/boards/${board}`
    );
    // dispatch an action to the store with put effect
    yield put(receivedBoardInformation(boardInfo));
  } catch (e) {
    console.error('getBoardInformation() error: ', e.message);
  }
}
