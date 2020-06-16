import { call, put, select } from 'redux-saga/effects';

import {
  receivedLatestSixPhotos,
  receivedLatestPhotos,
  receivedQueryPhotos,
} from '../actions/boards';
import { baseUrl, fetchData } from '../api';
import { getLatestPhotosPage, getQueryPhotosFromState } from './selectors';

export function* getLatestSixPhotos() {
  try {
    // call effect calls the function passed as first arguement.
    // any other arguments passed are the arguements of the function call passed
    // as the first, which is fetchData in this case
    const photos = yield call(fetchData, `${baseUrl}/photos`, 'latest', 1, 6);
    // dispatch an action to the store with put effect
    yield put(receivedLatestSixPhotos(photos));
  } catch (e) {
    // eslint-disable-next-line
    console.error('receivedLatesSixPhotos() error: ', e.message);
  }
}

export function* getLatestPhotos() {
  try {
    const latestPhotosFromState = yield select(getLatestPhotosPage);

    const latestPhotos = yield call(
      fetchData,
      `${baseUrl}/photos`,
      'latest',
      latestPhotosFromState.page + 1, // start at the first page
      18
    );
    // put effect dispatches an action the store
    yield put(receivedLatestPhotos(latestPhotos));
  } catch (e) {
    // eslint-disable-next-line
    console.error('getLatestPhotos() error: ', e.message);
  }
}

export function* getQueryPhotos() {
  try {
    const queryPhotosFromState = yield select(getQueryPhotosFromState);

    const queryPhotos = yield call(
      fetchData,
      `${baseUrl}/photos/search`,
      queryPhotosFromState.searchTerm,
      queryPhotosFromState.page + 1,
      18
    );
    // put effect dispatches an action to the store
    yield put(receivedQueryPhotos(queryPhotos));
  } catch ({ message }) {
    // eslint-disable-next-line
    console.error('getQueryPhotos() error: ', message);
  }
}
