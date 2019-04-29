import { call, put, select } from 'redux-saga/effects';

import { receivedUsersBoards } from '../actions/users';
import { getUsersBoards } from '../api';
import { getUsersId } from './selectors';

function* getAllUsersBoards() {
  try {
    const ownerId = yield select(getUsersId);
    // call effect calls the function passed as first arguement.
    // any other arguments passed are the arguements of the function call passed
    // as the first, which is fetchData in this case
    const boards = yield call(getUsersBoards, ownerId);
    // dispatch an action to the store with put effect
    yield put(receivedUsersBoards(boards));
  } catch (e) {
    console.error('receivedUsersBoards() error: ', e.message);
  }
}

export default getAllUsersBoards;
