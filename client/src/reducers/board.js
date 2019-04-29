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
        id: action.info.id,
        title: action.info.title,
        background: action.info.background,
        createdAt: action.info.createdAt,
        updatedAt: action.info.updatedAt,
      };
    default:
      return state;
  }
};

export default boardReducer;
