import { CREATE_BOARD_FORM_STATUS } from '../constants';

// CreateBoardForm component shouldn't be visible
const initialState = false;

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD_FORM_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default boardsReducer;
