import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Root from './Root';

import store from './store';

import './App.scss';

// Provider component makes the store available throught the app
const App = () => (
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>
);

export default App;
