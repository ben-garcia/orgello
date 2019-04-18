import { createStore } from 'redux';

import usersReducer from '../reducers/users';

const store = createStore(
  usersReducer,
  // redux dev tools
  // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
