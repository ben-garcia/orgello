import { REQUEST_CREATE_LIST, RECEIVED_CREATE_LIST } from '../constants';

export const requestCreateList = (list) => ({
  type: REQUEST_CREATE_LIST,
  list,
});

export const receivedCreateList = (newList) => ({
  type: RECEIVED_CREATE_LIST,
  newList,
});
