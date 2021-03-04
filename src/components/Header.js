import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/login"><p>Log In</p></Link>
    <Link to="/signup"><p>Sign Up</p></Link>
  </header>
);
export default Header;
