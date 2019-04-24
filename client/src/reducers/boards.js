import {
  CHANGE_CREATE_BOARD_FORM_STATUS,
  CHANGE_CREATE_BOARD_BACKGROUND,
  RECEIVED_LATEST_SIX_PHOTOS,
  RECEIVED_LATEST_PHOTOS,
  REMOVE_LATEST_PHOTOS,
  RECEIVED_QUERY_PHOTOS,
} from '../constants';

// CreateBoardForm component shouldn't be visible
const initialState = {
  isFormOpen: false,
  currentBackground: {
    backgroundImage: '',
  },
  latestSixPhotos: [],
  latestPhotos: [],
  queryPhotos: [],
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
        currentBackground: {
          backgroundImage: `url(${action.data[0].urls.thumb})`,
        },
        latestSixPhotos: [...action.data],
      };
    case RECEIVED_LATEST_PHOTOS:
      return {
        ...state,
        latestPhotos: [...action.latestPhotos],
      };
    case REMOVE_LATEST_PHOTOS:
      return {
        ...state,
        latestPhotos: [],
      };
    case RECEIVED_QUERY_PHOTOS:
      return {
        ...state,
        queryPhotos: [action.queryPhotos],
      };
    default:
      return state;
  }
};

export default boardsReducer;
