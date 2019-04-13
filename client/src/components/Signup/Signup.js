import React, { Component } from 'react';

import './Signup.scss';

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  }

  render() {
    return (
      <section className="signup">
        <h1 className="signup__title">Create an Account</h1>
        <form className="form">
          <label className="form__item" htmlFor="email">
            Email
            <input
              className="form__input"
              name="email"
              type="text"
              id="email"
              placeholder="e.g. johndoe@hotmail.com"
            />
          </label>
          <label className="form__item" htmlFor="username">
            Username
            <input
              className="form__input"
              name="username"
              type="text"
              id="username"
              placeholder="e.g. johndoe"
            />
          </label>
          <label className="form__item" htmlFor="password">
            Password
            <input
              className="form__input"
              name="password"
              type="password"
              id="password"
              placeholder="e.g. ************"
            />
          </label>
          <label className="form__item" htmlFor="confirm-password">
            Confirm Password
            <input
              className="form__input"
              name="confirm-password"
              type="password"
              id="confirm-password"
              placeholder="e.g. ************"
            />
          </label>
          <input
            className="signup-button"
            type="submit"
            value="Create New Account"
            disabled
          />
        </form>
      </section>
    );
  }
}

export default Signup;
