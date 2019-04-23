import { call, put, takeLatest } from 'redux-saga/effects';

import { REQUEST_LATEST_SIX_PHOTOS } from '../constants';
import { receivedLatestSixPhotos } from '../actions/boards';
import { fetchPhotos } from '../api';

function* getLatestSixPhotos() {
  try {
    const photos = yield call(fetchPhotos, 'http://localhost:9000/photos');
    yield put(receivedLatestSixPhotos(photos));
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {
  yield takeLatest(REQUEST_LATEST_SIX_PHOTOS, getLatestSixPhotos);
}
