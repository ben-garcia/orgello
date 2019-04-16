import React, { Component } from 'react';

import usersUrl from '../../api';

import '../Signup/Signup.scss';
import './Login.scss';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      emailUsername: '',
      password: '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // check that email is a valid email address and
  // username is alpha-numeric
  // fields cannot be left blank
  isValid() {
    const { emailUsername, password } = this.state;

    if (!emailUsername || !password) {
      // neither emailUsername nor password fields can be blank
      this.setState({
        error: 'Fields cannot be empty',
      });
      // email|username/password combination is not valid
      return false;
    }

    if (
      emailUsername.indexOf('@') !== -1 &&
      emailUsername.indexOf('.') !== -1
    ) {
      // user is trying to login with a email
      if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(emailUsername)) {
        this.setState({
          error: '"email" must be a valid email address',
        });
      }
    } else {
      // user is trying to use username
      if (emailUsername.length < 6) {
        this.setState({
          error: '"username" must contain a minimum of 6 characters',
        });
        return false;
      }
      if (!/^[a-zA-Z0-9]{6,30}$/.test(emailUsername)) {
        this.setState({
          error: '"username" can only contain alpha-numeric characters',
        });
        return false;
      }
    }
    // if there were no error then fields are valid.
    return true;
  }

  // handle form submission
  handleSubmit(e) {
    const { history } = this.props;

    // prevent a refresh
    e.preventDefault();

    if (this.isValid()) {
      // send a request to authenticate the user
      // redirect to the users dashboard
      history.push('/dashboard');
    }
  }

  render() {
    const { error } = this.state;

    return (
      <section className="login">
        {error ? <span className="error">{error}</span> : ''}
        <h1 className="title">Login In</h1>
        <form onSubmit={this.handleSubmit} className="form">
          <label className="form__item" htmlFor="email-username">
            Email or Username
            <input
              onChange={this.handleChange}
              className="form__input"
              name="emailUsername"
              type="text"
              id="email-username"
              placeholder="e.g. johndoe@hotmail.com"
            />
          </label>
          <label className="form__item" htmlFor="password">
            Password
            <input
              onChange={this.handleChange}
              className="form__input"
              name="password"
              type="password"
              id="password"
              placeholder="e.g. ************"
            />
          </label>
          <input
            className="button button--enabled"
            type="submit"
            value="Log In"
          />
        </form>
      </section>
    );
  }
}

export default Login;
