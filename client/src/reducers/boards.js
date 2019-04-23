import {
  CHANGE_CREATE_BOARD_FORM_STATUS,
  CHANGE_CREATE_BOARD_BACKGROUND,
  RECEIVED_LATEST_SIX_PHOTOS,
} from '../constants';

// CreateBoardForm component shouldn't be visible
const initialState = {
  isFormOpen: false,
  currentBackground: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1554291499-563a504e0734?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9)',
  },
  latestSixPhotos: [],
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CREATE_BOARD_FORM_STATUS:
      return {
        ...state,
        isFormOpen: action.payload,
      };
    case CHANGE_CREATE_BOARD_BACKGROUND:
      return {
        ...state,
        currentBackground: action.payload,
      };
    case RECEIVED_LATEST_SIX_PHOTOS:
      return {
        ...state,
        latestSixPhotos: [...action.payload.photos],
      };
    default:
      return state;
  }
};

export default boardsReducer;
