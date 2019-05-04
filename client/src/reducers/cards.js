import { RECEIVED_CREATE_CARD } from '../constants';

const cardReducer = (state, action) => {
  switch (action.type) {
    case RECEIVED_CREATE_CARD:
      console.log(action);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default cardReducer;
