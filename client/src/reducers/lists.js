/* eslint-disable no-case-declarations */
import {
  RECEIVED_CREATE_LIST,
  RECEIVED_UPDATE_LIST_TITLE,
  REORDER_LISTS,
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
    case REORDER_LISTS:
      return {
        ...state,
        lists: action.newState,
      };
    default:
      return state;
  }
};

export default listReducer;
