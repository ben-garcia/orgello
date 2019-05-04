import { call, put } from 'redux-saga/effects';

import { receivedCreateCard } from '../actions/cards';
import { createResource } from '../api';

export function* createCard({ card }) {
  try {
    // call effect calls the function passed as first arguement. // any other arguments passed are the arguements of the function call passed
    // as the first, which is createCard in this case
    const createdCard = yield call(
      createResource,
      `http://localhost:9000/cards`,
      card
    );
    // dispatch an action to the store with put effect
    yield put(receivedCreateCard(createdCard));
  } catch (e) {
    console.error('createdCard() error: ', e.message);
  }
}

export function* updateList() {
  // try {
  //   // call effect calls the function passed as first arguement.
  //   // any other arguments passed are the arguements of the function call passed
  //   // as the first, which is updateCard in this case
  //   const newList = yield call(
  //     updateResource,
  //     `http://localhost:9000/lists/${card.id}`,
  //     { title: card.title }
  //   );
  //   // list with the updated attributes
  //   const updatedCard = {
  //     // cast id to a number
  //     id: Number(newList.id),
  //     title: newList.title,
  //   };
  //   // dispatch an action to the store with the put effect
  //   yield put(receivedUpdateListTitle(updatedCard));
  // } catch (e) {
  //   console.error('updatedCard() error: ', e.message);
  // }
}
