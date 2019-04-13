import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';

import './App.scss';

const App = () => (
  <Router>
    <Navbar />
    <main className="main">
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
    </main>
    <Footer />
  </Router>
);

export default App;
