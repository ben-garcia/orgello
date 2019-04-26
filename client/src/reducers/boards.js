import {
  CHANGE_CREATE_BOARD_FORM_STATUS,
  CHANGE_BACKGROUND_OPTIONS,
  CHANGE_CREATE_BOARD_TITLE,
  CHANGE_CREATE_BOARD_BACKGROUND,
  RECEIVED_LATEST_SIX_PHOTOS,
  RECEIVED_LATEST_PHOTOS,
  REMOVE_LATEST_PHOTOS,
  RECEIVED_QUERY_PHOTOS,
  CHANGE_QUERY_PHOTOS_SEARCH_TERM,
  REMOVE_QUERY_PHOTOS,
} from '../constants';

// CreateBoardForm component shouldn't be visible
const initialState = {
  isFormOpen: false,
  isBackgroundOptionsOpen: false,
  title: '',
  currentBackground: {
    backgroundImage: '',
  },
  latestSixPhotos: [],
  latestPhotos: {
    photos: [],
    page: 0,
  },
  queryPhotos: {
    photos: [],
    searchTerm: '',
    page: 0,
  },
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CREATE_BOARD_FORM_STATUS:
      return {
        ...state,
        isFormOpen: action.payload,
      };
    case CHANGE_BACKGROUND_OPTIONS:
      return {
        ...state,
        isBackgroundOptionsOpen: action.newStatus,
      };
    case CHANGE_CREATE_BOARD_TITLE:
      return {
        ...state,
        title: action.newTitle,
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
        latestPhotos: {
          photos: [...state.latestPhotos.photos, ...action.latestPhotos],
          page: state.latestPhotos.page + 1,
        },
      };
    case REMOVE_LATEST_PHOTOS:
      return {
        ...state,
        latestPhotos: {
          photos: [],
          page: 0,
        },
      };
    case RECEIVED_QUERY_PHOTOS:
      return {
        ...state,
        queryPhotos: {
          ...state.queryPhotos,
          photos: [...state.queryPhotos.photos, ...action.queryPhotos],
          page: state.queryPhotos.page + 1,
        },
      };
    case REMOVE_QUERY_PHOTOS:
      return {
        ...state,
        queryPhotos: {
          photos: [],
          searchTerm: state.queryPhotos.searchTerm,
          page: 0,
        },
      };
    case CHANGE_QUERY_PHOTOS_SEARCH_TERM:
      return {
        ...state,
        queryPhotos: {
          ...state.queryPhotos,
          searchTerm: action.searchTerm,
        },
      };
    default:
      return state;
  }
};

export default boardsReducer;
