/* eslint-disable no-case-declarations */
import {
  ADD_LIST,
  CHANGE_LIST_TITLE,
  RECEIVED_CREATE_LIST,
  RECEIVED_UPDATE_LIST_TITLE,
  REORDER_LISTS,
} from '../constants';

const listReducer = (state, action) => {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.list],
      };
    case CHANGE_LIST_TITLE:
      // don't modify state
      const lists = [...state.lists];
      // get  refernce to the correct list
      const listToChange = lists.find((list) => list.id === action.listId);
      // update the title
      listToChange.title = action.newTitle;
      return {
        ...state,
        lists: [...state.lists],
      };
    case RECEIVED_CREATE_LIST:
      const { newList } = action;
      newList.cards = [];
      return {
        ...state,
        lists: [...state.lists, newList],
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
