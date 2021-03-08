import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PathComponent = ({
  path, icon, linkText, handleClick,
}) => (
  <Link to={`/${path}`} onClick={e => handleClick && handleClick(e)}>
    <div className="icons">

      <i className={`fa ${icon}`} />
      <p>{linkText}</p>
    </div>

  </Link>
);

PathComponent.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.string,
  linkText: PropTypes.string,
  handleClick: PropTypes.func,
};

PathComponent.defaultProps = {
  icon: '',
  linkText: '',
  handleClick: () => {},

};
export default PathComponent;
