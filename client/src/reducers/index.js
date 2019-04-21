import { combineReducers } from 'redux';

import usersReducer from './users';
import boardsReducer from './boards';

export default combineReducers({
  user: usersReducer,
  isCreateBoardFormOpen: boardsReducer,
});
