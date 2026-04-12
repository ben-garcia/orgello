/* eslint-disable no-case-declarations */
import {
  ADD_CARD,
  CHANGE_CARD_TITLE,
  RECEIVED_CREATE_CARD,
  RECEIVED_UPDATE_CARD_TITLE,
  REORDER_CARDS,
} from '../constants';

const cardReducer = (state, action) => {
  switch (action.type) {
    case ADD_CARD:
      const tempstate = [...state.lists];
      const listToChange = tempstate.find(
        (l) => l.id === action.newCard.listId
      );
      listToChange.cards = [...listToChange.cards, action.newCard];
      return {
        ...state,
        lists: tempstate,
      };
    case CHANGE_CARD_TITLE:
      const oldState = [...state.lists];
      const listToModify = oldState.find((l) => l.id === action.listId);
      const cardToModify = listToModify.find((c) => c.id === action.cardId);
      cardToModify.title = action.newTitle;
      return {
        ...state,
        lists: oldState,
      };
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
      return {
        ...state,
        lists: action.newState,
      };
    default:
      return state;
  }
};

export default cardReducer;
