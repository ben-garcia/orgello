import {
  ADD_LIST,
  CHANGE_LIST_TITLE,
  REQUEST_CREATE_LIST,
  RECEIVED_CREATE_LIST,
  REQUEST_UPDATE_LIST_TITLE,
  RECEIVED_UPDATE_LIST_TITLE,
  REORDER_LISTS,
} from '../constants';

export const addList = (list) => ({
  type: ADD_LIST,
  list,
});

export const changeListTitle = (listId, newTitle) => ({
  type: CHANGE_LIST_TITLE,
  listId,
  newTitle,
});

export const requestCreateList = (list) => ({
  type: REQUEST_CREATE_LIST,
  list,
});

export const receivedCreateList = (newList) => ({
  type: RECEIVED_CREATE_LIST,
  newList,
});

export const requestUpdateListTitle = (list) => ({
  type: REQUEST_UPDATE_LIST_TITLE,
  list,
});

export const receivedUpdateListTitle = (updatedList) => ({
  type: RECEIVED_UPDATE_LIST_TITLE,
  updatedList,
});

export const reorderLists = (newState) => ({
  type: REORDER_LISTS,
  newState,
});
