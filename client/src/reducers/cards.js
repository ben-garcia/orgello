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
      const { source, destination } = action;
      // console.log('reducer source: ', source);
      // console.log('reducer destination: ', destination);
      // console.log('reducer cardId: ', cardId);
      const newState = [...state.lists];
      if (source.list.id === destination.list.id) {
        // source card and destination card are in the same list
        const activeList = newState.find((l) => l.id === source.list.id);
        const destinationCard = activeList.cards[destination.index];
        const activeCard = activeList.cards.splice(source.index, 1)[0];
        // console.log('activeCard: ', activeCard);
        // console.log('destinationCard: ', destinationCard);
        if (source.index < destination.index) {
          // when destination index is greater then
          // card order must be greater than destination
          activeCard.order = destinationCard.order + 100;
        } else {
          // otherwise it's less
          activeCard.order = destination.order - 100;
        }
        // add the card in it's new place
        activeList.cards.splice(destination.index, 0, activeCard);
      } else {
        // when source card and destination card are in different lists
        const sourceList = newState.find((l) => l.id === source.list.id);
        const destinationList = newState.find(
          (l) => l.id === destination.list.id
        );
        const destinationCard = destinationList.cards[destination.index];
        // console.log('destinationCard: ', destinationCard);
        // remove from the source list
        const activeCard = sourceList.cards.splice(source.index, 1)[0];
        // console.log('activeCard: ', activeCard);

        // console.log('destinationList.length: ', destinationList.cards.length);
        // console.log('destination.index: ', destination.index);
        if (destinationList.cards.length > destination.index) {
          // index of destination cannot be greater than the length of cards in
          // the list - 1
          activeCard.order = destinationCard.order - 100;
        } else if (destinationList.cards.length === destination.index) {
          // make sure that the destination lists has at least one card
          if (destinationList.cards.length > 0) {
            // card should be placed at the end on the list
            activeCard.order =
              destinationList.cards[destinationList.cards.length - 1].order +
              100;
          }
        }

        // add the card to the proper list
        destinationList.cards.splice(destination.index, 0, activeCard);

        // console.log('after order------activeCard: ', activeCard);
      }
      // console.log('newState: ', newState);
      return {
        ...state,
        lists: newState,
      };
    default:
      return state;
  }
};

export default cardReducer;
