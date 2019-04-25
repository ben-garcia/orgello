import { call, put, select, takeLatest } from 'redux-saga/effects';

import { REQUEST_LATEST_SIX_PHOTOS, REQUEST_LATEST_PHOTOS } from '../constants';
import {
  receivedLatestSixPhotos,
  receivedLatestPhotos,
} from '../actions/boards';
import { fetchData } from '../api';
import { getLatestPhotosPage, getQueryPhotosSearchTerm } from './selectors';

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
    console.log('receivedLatesSixPhotos() error: ', e.message);
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
    console.log('getLatestPhotos() error: ', e.message);
  }
}

export default function* rootSaga() {
  // takeLatest effect takes the latest action dispatched
  // if two actions are fired one after another, the last action will fire
  // while the first is canceled
  yield takeLatest(REQUEST_LATEST_SIX_PHOTOS, getLatestSixPhotos);
  yield takeLatest(REQUEST_LATEST_PHOTOS, getLatestPhotos);
}
