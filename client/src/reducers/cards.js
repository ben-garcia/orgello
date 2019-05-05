/* eslint-disable no-case-declarations */
import { RECEIVED_CREATE_CARD } from '../constants';

const cardReducer = (state, action) => {
  switch (action.type) {
    case RECEIVED_CREATE_CARD:
      // state is immutable
      const tempState = [...state.lists];
      // get a reference to the newCard.boadId
      const list = tempState.find((l) => l.id === action.newCard.listId);
      if (!list.cards) {
        list.cards = [action.newCard];
      } else {
        list.cards = [...list.cards, action.newCard];
      }
      return {
        ...state,
        lists: tempState,
      };
    default:
      return state;
  }
};

export default cardReducer;
