import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import usersReducer from './users';
import boardsReducer from './boards';
import boardReducer from './board';
import listReducer from './lists';

export default combineReducers({
  user: usersReducer,
  createBoard: boardsReducer,
  // board is modified by either reducer
  board: reduceReducers(boardReducer, listReducer),
});
