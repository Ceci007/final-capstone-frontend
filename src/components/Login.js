import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { handleLogin } = this.props;

    const user = {
      username,
      password,
    };

    axios.post('http://localhost:3001/login', { user }, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
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
    const { username, password, errors } = this.state;
    return (
      <div>
        <h1>Log In</h1>
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
          <button placeholder="submit" type="submit">
            Log In
          </button>
          <div>
            or
            {' '}
            <Link to="/signup">sign up</Link>
          </div>

        </form>
        <div>
          { errors ? this.handleErrors() : null }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  handleLogin: PropTypes.func.isRequired,
};

Login.defaultProps = {
  history: {},
};

export default withRouter(Login);
