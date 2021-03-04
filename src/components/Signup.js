import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errors: '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this);
  }

  handleChangeName(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handleChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleChangePasswordConfirm(e) {
    this.setState({
      passwordConfirmation: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, passwordConfirmation } = this.state;
    const { handleLogin } = this.props;
    const user = {
      username,
      password,
      passwordConfirmation,
    };

    axios.post('http://localhost:3001/users', { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'created') {
          handleLogin(response.data);
          this.redirect();
        } else {
          this.setState({
            errors: response.data.errors,
          });
        }
      })
      .catch(error => console.log('api errors:', error));
  }

  handleErrors() {
    const { errors } = this.state;
    return (
      <div>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
      </div>
    );
  }

  redirect() {
    const { history } = this.props;
    if (history) history.push('/');
  }

  render() {
    const {
      username, password, passwordConfirmation, errors,
    } = this.state;
    return (
      <div>
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChangeName}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
          />
          <input
            placeholder="password confirmation"
            type="password"
            name="passwordConfirmation"
            // eslint-disable-next-line camelcase
            value={passwordConfirmation}
            onChange={this.handleChangePasswordConfirm}
          />
          <button placeholder="submit" type="submit">
            Sign In
          </button>
        </form>
        <div>
          { errors ? this.handleErrors() : null }
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  handleLogin: PropTypes.func.isRequired,
};

Signup.defaultProps = {
  history: {},
};
export default Signup;
