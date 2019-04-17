import React, { Component } from 'react';
import Joi from 'joi-browser';

import authUrl from '../../api';

import './Signup.scss';

const objectSchema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    .email()
    .required(),
  username: Joi.string()
    .trim()
    .alphanum()
    .min(6)
    .max(30)
    .required(),
  password: Joi.string()
    .trim()
    .regex(/^[a-zA-Z0-9]{6,30}$/)
    .required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required(),
});

const emailSchema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    .email()
    .required(),
});

const usernameSchema = Joi.object().keys({
  username: Joi.string()
    .trim()
    .alphanum()
    .min(6)
    .max(30)
    .required(),
});

const passwordSchema = Joi.object().keys({
  password: Joi.string()
    .trim()
    .regex(/^[a-zA-Z0-9]{6,30}$/)
    .required(),
});

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      emailError: '',
      username: '',
      usernameError: '',
      password: '',
      passwordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
      disabled: true,
      serverError: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  // returns true is the password and confirmPassword are equal.
  doPasswordsMatch() {
    const { password, confirmPassword } = this.state;
    return password === confirmPassword;
  }

  // has the user object been validated
  isFormReadyToSubmit() {
    const {
      email,
      emailError,
      username,
      usernameError,
      password,
      passwordError,
      confirmPassword,
      confirmPasswordError,
    } = this.state;

    if (
      email &&
      !emailError &&
      username &&
      !usernameError &&
      password &&
      !passwordError &&
      confirmPassword &&
      !confirmPasswordError &&
      this.doPasswordsMatch()
    ) {
      const user = {
        email,
        username,
        password,
        confirmPassword,
      };

      const result = Joi.validate(user, objectSchema);

      if (result.error === null) {
        this.setState({
          disabled: false,
        });
      }
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  validateSchema(inputName, inputValue) {
    let schema = null;

    // determine input name and use the proper schema
    switch (inputName) {
      case 'email':
        schema = emailSchema;
        break;
      case 'username':
        schema = usernameSchema;
        break;
      case 'password':
        schema = passwordSchema;
        break;
      case 'confirmPassword':
        if (this.doPasswordsMatch()) {
          this.setState({
            confirmPasswordError: '',
          });
          this.isFormReadyToSubmit();
        } else {
          this.setState({
            confirmPasswordError: '"Confirm Password" must match "Password"',
          });
        }
        return;
      default:
        break;
    }

    // name of the error
    const propertyWithError = `${inputName}Error`;
    // user to test against the schema
    const user = {
      [inputName]: inputValue,
    };

    const result = Joi.validate(user, schema);

    if (result.error === null) {
      this.setState({
        [propertyWithError]: '',
      });
    } else {
      const errorMessage = result.error.message.split('[')[1].replace(']', '');
      this.setState({
        [propertyWithError]: errorMessage,
      });
    }
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => this.isFormReadyToSubmit()
    );
  }

  // handle form submission
  handleSubmit(e) {
    // prevent a refresh
    e.preventDefault();

    const { history } = this.props;
    const { email, username, password } = this.state;

    const user = {
      email,
      username,
      password,
    };

    // flag to keep track of error across .then
    let isOk = true;

    // send the request to the server
    fetch(`${authUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => {
        // if there was a error(validation) then
        // set the flag to false
        if (!res.ok) {
          isOk = false;
        }
        // resolve the promise by calling json()
        // which will parse the json
        return res.json();
      })
      .then((data) => {
        if (isOk) {
          // isOk === true means that there was no validation errors

          // store the token, returned from the server, in local storage
          // to authorized the user in subsequent requests.
          localStorage.setItem('token', data.token);
          // redirect to the login page after a successfull signup
          history.push('/login');
        } else {
          // create an error which will be caught by catch
          throw new Error(data.error.message);
        }
      })
      .catch((err) => {
        // let the user know why they were unable to signup
        // possible reasons are either
        // 1. the email is already taken
        // OR
        // 2. the username is already taken
        this.setState({
          serverError: err.message,
          disabled: true,
        });
      });
  }

  // when the input losses focus.
  // validate the schema
  handleBlur(e) {
    this.validateSchema(e.target.name, e.target.value);
    this.isFormReadyToSubmit();
  }

  render() {
    const {
      emailError,
      usernameError,
      passwordError,
      confirmPasswordError,
      disabled,
      serverError,
    } = this.state;

    return (
      <section className="signup">
        {serverError ? <span className="error">{serverError}</span> : ''}
        <h1 className="title">Create an Account</h1>
        <form onSubmit={this.handleSubmit} className="form">
          <label className="form__item" htmlFor="email">
            Email
            <input
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              className={
                emailError ? 'form__input form__input--error' : 'form__input'
              }
              name="email"
              type="text"
              id="email"
              placeholder="e.g. johndoe@hotmail.com"
            />
            {emailError ? <span className="error">{emailError}</span> : ''}
          </label>
          <label className="form__item" htmlFor="username">
            Username
            <input
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              className={
                usernameError ? 'form__input form__input--error' : 'form__input'
              }
              name="username"
              type="text"
              id="username"
              placeholder="e.g. johndoe"
            />
            {usernameError ? (
              <span className="error">{usernameError}</span>
            ) : (
              ''
            )}
          </label>
          <label className="form__item" htmlFor="password">
            Password
            <input
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              className={
                passwordError ? 'form__input form__input--error' : 'form__input'
              }
              name="password"
              type="password"
              id="password"
              placeholder="e.g. ************"
            />
            {passwordError ? (
              <span className="error">{passwordError}</span>
            ) : (
              ''
            )}
          </label>
          <label className="form__item" htmlFor="confirm-password">
            Confirm Password
            <input
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              className={
                confirmPasswordError
                  ? 'form__input form__input--error'
                  : 'form__input'
              }
              name="confirmPassword"
              type="password"
              id="confirm-password"
              placeholder="e.g. ************"
            />
            {confirmPasswordError ? (
              <span className="error">{confirmPasswordError}</span>
            ) : (
              ''
            )}
          </label>
          <input
            className={disabled ? 'button' : 'button button--enabled'}
            type="submit"
            value="Create New Account"
            disabled={disabled}
          />
        </form>
      </section>
    );
  }
}

export default Signup;
