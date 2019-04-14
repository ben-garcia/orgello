import React, { Component } from 'react';
import Joi from 'joi-browser';

import './Signup.scss';

const objectSchema = Joi.object().keys({
  email: Joi.string()
    .trim()
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
        } else {
          this.setState({
            confirmPasswordError: '"Confirm Password must match "Password"',
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

    Joi.validate(user, schema)
      .then(() => {
        this.setState({
          [propertyWithError]: '',
        });
        this.isFormReadyToSubmit();
      })
      .catch((err) => {
        const errorMessage = err.message.split('[')[1].replace(']', '');
        this.setState({
          [propertyWithError]: errorMessage,
        });
      });
  }

  handleChange(e) {
    const { disabled } = this.state;

    if (!disabled) {
      this.setState({
        disabled: true,
      });
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, username, password } = this.state;

    const user = {
      email,
      username,
      password,
    };

    console.log('user submitted: ', user);
  }

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
    } = this.state;
    const { disabled } = this.state;

    return (
      <section className="signup">
        <h1 className="signup__title">Create an Account</h1>
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
            {emailError ? (
              <span className="form__error">{emailError}</span>
            ) : (
              ''
            )}
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
              <span className="form__error">{usernameError}</span>
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
              <span className="form__error">{passwordError}</span>
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
              <span className="form__error">{confirmPasswordError}</span>
            ) : (
              ''
            )}
          </label>
          <input
            className={
              disabled
                ? 'signup-button'
                : 'signup-button signup-button--enabled'
            }
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
