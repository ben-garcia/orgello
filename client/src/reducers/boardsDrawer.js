import { OPEN_BOARDS_DRAWER, CLOSE_BOARDS_DRAWER } from '../constants';

const initialState = {
  isOpen: false,
};

const boardsDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_BOARDS_DRAWER:
      return {
        isOpen: true,
      };
    case CLOSE_BOARDS_DRAWER:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
};

export default boardsDrawerReducer;
