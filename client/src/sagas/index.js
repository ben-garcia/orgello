import { call, put, takeLatest } from 'redux-saga/effects';

import { REQUEST_LATEST_SIX_PHOTOS } from '../constants';
import { receivedLatestSixPhotos } from '../actions/boards';
import { fetchPhotos } from '../api';

function* getLatestSixPhotos() {
  try {
    const data = yield call(fetchPhotos, 'new-releases');
    yield put(receivedLatestSixPhotos(data));
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {
  yield takeLatest(REQUEST_LATEST_SIX_PHOTOS, getLatestSixPhotos);
}
