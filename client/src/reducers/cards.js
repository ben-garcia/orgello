/* eslint-disable no-case-declarations */
import {
  RECEIVED_CREATE_CARD,
  RECEIVED_UPDATE_CARD_TITLE,
  REORDER_CARDS,
} from '../constants';

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
    case RECEIVED_UPDATE_CARD_TITLE:
      // keep state immutable
      const temporaryState = [...state.lists];
      // find the list that corresponds to the updatedCard
      const tempList = temporaryState.find(
        (l) => l.id === action.updatedCard.listId
      );
      // find the card in the list
      const card = tempList.cards.find((c) => c.id === action.updatedCard.id);
      // updated the title
      card.title = action.updatedCard.title;
      return {
        ...state,
        lists: temporaryState,
      };
    case REORDER_CARDS:
      console.log('reducer source: ', action.source);
      console.log('reducer destination: ', action.destination);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default cardReducer;
