import { combineReducers } from 'redux';

import usersReducer from './users';
import boardsReducer from './boards';
import boardReducer from './board';
import listReducer from './lists';

export default combineReducers({
  user: usersReducer,
  createBoard: boardsReducer,
  board: boardReducer,
});
