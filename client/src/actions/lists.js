import {
  REQUEST_CREATE_LIST,
  RECEIVED_CREATE_LIST,
  REQUEST_LIST_UPDATE,
  RECEIVED_LIST_UPDATE,
} from '../constants';

export const requestCreateList = (list) => ({
  type: REQUEST_CREATE_LIST,
  list,
});

export const receivedCreateList = (newList) => ({
  type: RECEIVED_CREATE_LIST,
  newList,
});

export const requestListUpdate = (list) => ({
  type: REQUEST_LIST_UPDATE,
  list,
});

export const receivedListUpdate = (updatedList) => ({
  type: RECEIVED_LIST_UPDATE,
  updatedList,
});
