import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser, requestUsersBoards } from '../../actions/users';
import { authUrl } from '../../api';

import '../Signup/Signup.scss';
import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailUsername: '',
      password: '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { history, user } = this.props;

    if (user.isLoggedIn) {
      history.push(`${user.username}/dashboard`);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // check that email is a valid email address and
  // username is alpha-numeric
  // fields cannot be left blank
  inputValidation() {
    const { emailUsername, password } = this.state;
    let userSubmittedEmail = false;
    let userSubmittedUsername = false;

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
      // does the email match a valid email address format
      if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(emailUsername)) {
        this.setState({
          error: '"email" must be a valid email address',
        });
      } else {
        // user is trying to login with an email addresss
        userSubmittedEmail = true;
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
      // user is trying to login with a username
      userSubmittedUsername = true;
    }
    // if there were no errors then fields are valid.
    return {
      isValid: true,
      email: userSubmittedEmail ? emailUsername : '',
      username: userSubmittedUsername ? emailUsername : '',
    };
  }

  // handle form submission
  handleSubmit(e) {
    // prevent a refresh
    e.preventDefault();

    const { history, login, requestUserBoards } = this.props;
    const { password } = this.state;

    const result = this.inputValidation();

    const user = { password };

    // user is trying to use email address
    if (result.email) {
      user.email = result.email;
    }

    // user is trying to use a username
    if (result.username) {
      user.username = result.username;
    }

    if (result.isValid) {
      let isOk = true;

      // send a request to authenticate the user
      fetch(`${authUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (!res.ok) {
            // if the user was not found
            isOk = false;
          }
          // parse the response into JSON
          return res.json();
        })
        .then((data) => {
          if (isOk) {
            // isOk === means that the server returned a valid user

            // store the user(with token), returned from the server, in local storage
            // to authorized the user in subsequent requests.
            localStorage.setItem('user', JSON.stringify(data));
            // dispatch 'changeUserLoggedInStatus' to change user.loggedIn to true
            login({ ...data, isLoggedIn: true });
            // fetch user boards
            requestUserBoards(data.id);
            // redirect to the users dashboard
            history.push(`/${data.username}/dashboard`);
          } else {
            throw new Error(data.error);
          }
        })
        .catch((error) => {
          this.setState({
            error: error.message,
            emailUsername: '',
            password: '',
          });
        });
    }
  }

  render() {
    const { emailUsername, password, error } = this.state;

    return (
      <section className="login">
        {error ? <span className="error">{error}</span> : ''}
        <h1 className="title">Login In</h1>
        <form onSubmit={this.handleSubmit} className="form">
          <label className="form__item" htmlFor="email-username">
            Email or Username
            <input
              onChange={this.handleChange}
              value={emailUsername}
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
              value={password}
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
  }),
  login: PropTypes.func.isRequired,
  requestUserBoards: PropTypes.func.isRequired,
};

Login.defaultProps = {
  user: {
    isLoggedIn: false,
  },
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (userInfo) => dispatch(loginUser(userInfo)),
  requestUserBoards: (userId) => dispatch(requestUsersBoards(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
