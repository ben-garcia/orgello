import { REQUEST_CREATE_CARD, RECEIVED_CREATE_CARD } from '../constants';

export const requestCreateCard = (card) => ({
  type: REQUEST_CREATE_CARD,
  card,
});

export const receivedCreateCard = (newCard) => ({
  type: RECEIVED_CREATE_CARD,
  newCard,
});

// export const requestUpdateCardTitle = (card) => ({
//   type: REQUEST_UPDATE_CARD_TITLE,
//   card,
// });

// export const receivedUpdateListTitle = (updatedCard) => ({
//   type: RECEIVED_UPDATE_CARD_TITLE,
//   updatedCard,
// });
