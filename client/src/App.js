import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';

import './App.scss';

const App = () => (
  <Router>
    <Navbar />
    <main className="main">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/:username/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </main>
    <Footer />
  </Router>
);

export default App;
