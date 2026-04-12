import { OPEN_USER_DRAWER, CLOSE_USER_DRAWER } from '../constants';

const initialState = {
  isOpen: false,
};

const userDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_USER_DRAWER:
      return {
        isOpen: true,
      };
    case CLOSE_USER_DRAWER:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
};

export default userDrawerReducer;
