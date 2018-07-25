import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import imgLogo from '../assets/images/logo.png';

import '../assets/css/nav.css';

const Navbar = ({ active }) => (
  <div>
    <nav>
      <ul>
        <li>
          <img src={imgLogo} alt="img of logo" />
        </li>
        <li>
          <Link to="/" className="title">HealthStory</Link>
        </li>
        <li className="right">
          <Link to="/journey" className={active === 'journey' ? 'selected' : ''}>data journey</Link>
        </li>
        <li className="right">
          <Link to="/explorer" className={active === 'explorer' ? 'selected' : ''}>data explorer</Link>
        </li>
      </ul>
    </nav>
  </div>
);

Navbar.defaultProps = {
  active: ''
};

Navbar.propTypes = {
  active: PropTypes.string
};

export default Navbar;
