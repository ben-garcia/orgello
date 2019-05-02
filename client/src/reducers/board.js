import {
  OPEN_BOARD,
  CLOSE_BOARD,
  GET_BOARD_INFO,
  CHANGE_ACTIVE_BOARD_BACKGROUND,
  RECEIVED_BOARD_TITLE_CHANGE,
  RECEIVED_BOARD_BACKGROUND_CHANGE,
  RECEIVED_BOARD_INFORMATION,
} from '../constants';

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
    case CHANGE_ACTIVE_BOARD_BACKGROUND:
      return {
        ...state,
        background: action.newBackground,
      };
    case RECEIVED_BOARD_TITLE_CHANGE:
      return {
        ...state,
        title: action.newTitle.board.title,
      };
    case RECEIVED_BOARD_BACKGROUND_CHANGE:
      return {
        ...state,
        background: action.newBackground.board.background,
      };
    case RECEIVED_BOARD_INFORMATION:
      return {
        isOpen: true,
        ...action.boardInfo,
      };
    default:
      return state;
  }
};

export default boardReducer;
