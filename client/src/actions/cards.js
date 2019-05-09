import {
  REQUEST_CREATE_CARD,
  RECEIVED_CREATE_CARD,
  REQUEST_UPDATE_CARD_TITLE,
  RECEIVED_UPDATE_CARD_TITLE,
  REORDER_CARDS,
} from '../constants';

export const requestCreateCard = (card) => ({
  type: REQUEST_CREATE_CARD,
  card,
});

export const receivedCreateCard = (newCard) => ({
  type: RECEIVED_CREATE_CARD,
  newCard,
});

export const requestUpdateCardTitle = (card) => ({
  type: REQUEST_UPDATE_CARD_TITLE,
  card,
});

export const receivedUpdateCardTitle = (updatedCard) => ({
  type: RECEIVED_UPDATE_CARD_TITLE,
  updatedCard,
});

export const reorderCards = (newState) => ({
  type: REORDER_CARDS,
  newState,
});
