import { OPEN_BOARD, CLOSE_BOARD, GET_BOARD_INFO } from '../constants';

const initialState = {
  isOpen: false,
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_BOARD:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_BOARD:
      return {
        isOpen: false,
      };
    case GET_BOARD_INFO:
      return {
        isOpen: true,
        ...action.info,
      };
    default:
      return state;
  }
};

export default boardReducer;
