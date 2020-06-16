import { call, put } from 'redux-saga/effects';

import { receivedCreateCard, receivedUpdateCardTitle } from '../actions/cards';
import { baseUrl, createResource, updateResource } from '../api';

export function* createCard({ card }) {
  try {
    // call effect calls the function passed as first arguement. // any other arguments passed are the arguements of the function call passed
    // as the first, which is createCard in this case
    const createdCard = yield call(createResource, `${baseUrl}/cards`, card);
    // dispatch an action to the store with put effect
    yield put(receivedCreateCard(createdCard));
  } catch (e) {
    // eslint-disable-next-line
    console.error('createdCard() error: ', e.message);
  }
}

export function* updateCard({ card }) {
  try {
    // call effect calls the function passed as first arguement.
    // any other arguments passed are the arguements of the function call passed
    // as the first, which is updateCard in this case
    const newCard = yield call(updateResource, `${baseUrl}/cards/${card.id}`, {
      title: card.title,
      listId: card.listId,
    });
    // list with the updated attributes
    // const updatedCard = {
    //   // cast id to a number
    //   id: Number(newCard.id),
    //   title: newCard.title,
    // };
    // dispatch an action to the store with the put effect
    yield put(receivedUpdateCardTitle(newCard));
  } catch (e) {
    // eslint-disable-next-line
    console.error('updateCard() error: ', e.message);
  }
}
