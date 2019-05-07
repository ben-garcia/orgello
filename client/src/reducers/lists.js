/* eslint-disable no-case-declarations */
import {
  RECEIVED_CREATE_LIST,
  RECEIVED_UPDATE_LIST_TITLE,
  RECEIVED_UPDATE_LIST_ORDER,
} from '../constants';

const listReducer = (state, action) => {
  switch (action.type) {
    case RECEIVED_CREATE_LIST:
      return {
        ...state,
        lists: [...state.lists, action.newList],
      };
    case RECEIVED_UPDATE_LIST_TITLE:
      // state is immutable
      const updatedLists = [...state.lists];
      const item = updatedLists.find(
        (list) => list.id === action.updatedList.id
      );
      item.title = action.updatedList.title;
      return {
        ...state,
        lists: updatedLists,
      };
    case RECEIVED_UPDATE_LIST_ORDER:
      const stateWithOrderUpdated = [...state.lists];
      const oldList = stateWithOrderUpdated.find(
        (l) => l.id === action.updatedList.id
      );
      oldList.order = action.updatedList.order;
      return {
        ...state,
        lists: stateWithOrderUpdated,
      };
    default:
      return state;
  }
};

export default listReducer;
