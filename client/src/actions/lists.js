import {
  REQUEST_CREATE_LIST,
  RECEIVED_CREATE_LIST,
  REQUEST_UPDATE_LIST_TITLE,
  RECEIVED_UPDATE_LIST_TITLE,
  REQUEST_UPDATE_LIST_ORDER,
  RECEIVED_UPDATE_LIST_ORDER,
} from '../constants';

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

export const requestUpdateListOrder = (list) => ({
  type: REQUEST_UPDATE_LIST_ORDER,
  list,
});

export const receivedUpdateListOrder = (updatedList) => ({
  type: RECEIVED_UPDATE_LIST_ORDER,
  updatedList,
});
