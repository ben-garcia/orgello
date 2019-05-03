import { RECEIVED_CREATE_LIST, RECEIVED_LIST_UPDATE } from '../constants';

const listReducer = (state, action) => {
  switch (action.type) {
    case RECEIVED_CREATE_LIST:
      return {
        ...state,
        lists: [...state.lists, action.newList],
      };
    case RECEIVED_LIST_UPDATE:
      console.log('action: ', action);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default listReducer;
