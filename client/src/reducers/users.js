import { LOGIN_USER, LOGOUT_USER } from '../constants';

// when the user vists the site they are not logged in.
// unless they have a token stored in localStorage
const initialState = {
  user: {
    isLoggedIn: false,
  },
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        isLoggedIn: action.userInfo.isLoggedIn,
        id: action.userInfo.id,
        email: action.userInfo.email,
        username: action.userInfo.username,
        createdAt: action.userInfo.createdAt,
        updatedAt: action.userInfo.updatedAt,
      };
    case LOGOUT_USER:
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default usersReducer;
