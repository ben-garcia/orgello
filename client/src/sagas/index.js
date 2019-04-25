import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  REQUEST_LATEST_SIX_PHOTOS,
  REQUEST_LATEST_PHOTOS,
  REQUEST_QUERY_PHOTOS,
} from '../constants';
import {
  receivedLatestSixPhotos,
  receivedLatestPhotos,
  receivedQueryPhotos,
} from '../actions/boards';
import { fetchData } from '../api';
import { getLatestPhotosPage, getQueryPhotosFromState } from './selectors';

function* getLatestSixPhotos() {
  try {
    // call effect calls the function passed as first arguement.
    // any other arguments passed are the arguements of the function call passed
    // as the first, which is fetchData in this case
    const photos = yield call(
      fetchData,
      'http://localhost:9000/photos',
      'latest',
      1,
      6
    );
    // dispatch an action to the store with put effect
    yield put(receivedLatestSixPhotos(photos));
  } catch (e) {
    console.error('receivedLatesSixPhotos() error: ', e.message);
  }
}

function* getLatestPhotos() {
  try {
    const latestPhotosFromState = yield select(getLatestPhotosPage);

    const latestPhotos = yield call(
      fetchData,
      'http://localhost:9000/photos',
      'latest',
      latestPhotosFromState.page + 1, // start at the first page
      18
    );
    // put effect dispatches an action the store
    yield put(receivedLatestPhotos(latestPhotos));
  } catch (e) {
    console.error('getLatestPhotos() error: ', e.message);
  }
}

function* getQueryPhotos() {
  try {
    const queryPhotosFromState = yield select(getQueryPhotosFromState);

    const queryPhotos = yield call(
      fetchData,
      'http://localhost:9000/photos/search',
      queryPhotosFromState.searchTerm,
      queryPhotosFromState.page + 1,
      18
    );
    // put effect dispatches an action to the store
    yield put(receivedQueryPhotos(queryPhotos));
  } catch ({ message }) {
    console.error('getQueryPhotos() error: ', message);
  }
}

export default function* rootSaga() {
  // takeLatest effect takes the latest action dispatched
  // if two actions are fired one after another, the last action will fire
  // while the first is canceled
  yield takeLatest(REQUEST_LATEST_SIX_PHOTOS, getLatestSixPhotos);
  yield takeLatest(REQUEST_LATEST_PHOTOS, getLatestPhotos);
  yield takeLatest(REQUEST_QUERY_PHOTOS, getQueryPhotos);
}
