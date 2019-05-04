import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import usersReducer from './users';
import boardsReducer from './boards';
import boardReducer from './board';
import listReducer from './lists';
import cardReducer from './cards';

export default combineReducers({
  user: usersReducer,
  createBoard: boardsReducer,
  // board can be modified by all reducers
  board: reduceReducers(boardReducer, listReducer, cardReducer),
});
