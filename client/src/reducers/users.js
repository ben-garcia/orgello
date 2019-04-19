import USER_LOGGED_IN_STATUS from '../constants';

// when the user vists the site they are not logged in.
// unless they have a token stored in localStorage
const initialState = {
  user: {
    isLoggedIn: false,
  },
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN_STATUS:
      return {
        user: {
          isLoggedIn: action.payload,
        },
      };
    default:
      return state;
  }
};

export default usersReducer;
