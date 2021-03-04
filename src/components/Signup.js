import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      errors: '',
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { username, password, password_confirmation } = this.state;
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <input
            placeholder="password confirmation"
            type="password"
            name="password_confirmation"
            // eslint-disable-next-line camelcase
            value={password_confirmation}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Sign In
          </button>
        </form>
      </div>
    );
  }
}
export default Signup;
