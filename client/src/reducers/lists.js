import { RECEIVED_CREATE_LIST } from '../constants';

const listReducer = (state, action) => {
  switch (action.type) {
    case RECEIVED_CREATE_LIST:
      console.log(action);
      return {
        ...state,
        lists: [...state.lists, action.newList],
      };
    default:
      return state;
  }
};

export default listReducer;
