import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Login.css';
import { loginUser } from '../../actions/user';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { user, isLogin } = this.props;
    if (user !== prevProps.user && isLogin) {
      const { history } = this.props;
      history.push('/main');
    }
  }

  handleChangeName = e => {
    this.setState({
      username: e.target.value,
    });
  }

  handleChangePassword = e => {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit= async e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { loginUser } = this.props;
    const response = await loginUser({ username, password });
    const { error } = this.props;

    if (response.data.status === 401) {
      this.setState({
        errors: error,
      });
    }
  }

  handleErrors = () => {
    const { errors } = this.state;
    setTimeout(() => this.setState({ errors: '' }), 3000);
    if (errors.length > 0) {
      return (
        <div>
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
        </div>
      );
    }
    return null;
  }

  render() {
    const { username, password, errors } = this.state;
    return (
      <section className="login">
        <div>
          <ul id="errors-div" className="errors-div">
            {errors ? this.handleErrors() : null}
          </ul>
        </div>
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChangeName}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
          />
          <button className="btn-login" placeholder="submit" type="submit">
            Login
          </button>
          <p>OR</p>
          <button type="button" className="btn-signup">
            <Link to="/signup">Create an account</Link>
          </button>

        </form>

      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isLogin: state.user.isLogin,
  error: state.user.errors,
});

const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(loginUser(data)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  loginUser: PropTypes.func,
  user: PropTypes.shape({}),
  isLogin: PropTypes.bool,
  error: PropTypes.instanceOf(Array),

};

Login.defaultProps = {
  history: {},
  loginUser: () => {},
  user: {},
  isLogin: false,
  error: [],
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
