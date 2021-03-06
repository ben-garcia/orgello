import { call, put } from 'redux-saga/effects';

import { receivedCreateList, receivedUpdateListTitle } from '../actions/lists';
import { baseUrl, createResource, updateResource } from '../api';

export function* createList({ list }) {
  try {
    // call effect calls the function passed as first arguement.
    // any other arguments passed are the arguements of the function call passed
    // as the first, which is createList in this case
    const createdList = yield call(createResource, `${baseUrl}/lists`, list);
    // dispatch an action to the store with put effect
    yield put(receivedCreateList(createdList));
  } catch (e) {
    // eslint-disable-next-line
    console.error('createList() error: ', e.message);
  }
}

export function* updateList({ list }) {
  try {
    // call effect calls the function passed as first arguement.
    // any other arguments passed are the arguements of the function call passed
    // as the first, which is updateList in this case
    const newList = yield call(updateResource, `${baseUrl}/lists/${list.id}`, {
      title: list.title,
    });
    // list with the updated attributes
    const updatedList = {
      // cast id to a number
      id: Number(newList.id),
      title: newList.title,
    };
    // dispatch an action to the store with the put effect
    yield put(receivedUpdateListTitle(updatedList));
  } catch (e) {
    // eslint-disable-next-line
    console.error('updateList() error: ', e.message);
  }
}
