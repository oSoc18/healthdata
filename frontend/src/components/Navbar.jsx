import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import imgLogo from '../assets/images/logo.png';

import '../assets/css/nav.css';

const Navbar = ({ active }) => (
  <div>
    <nav>
      <img src={imgLogo} alt="img of logo" />
      <ul>
        <li>
          <Link to="/" className="title">HealthStory</Link>
        </li>
        <li>
          <li>
            <Link to="/journey" className={active === 'journey' ? 'selected' : ''}>data journey</Link>
          </li>
          <li>
            <Link to="/explorer" className={active === 'explorer' ? 'selected' : ''}>data explorer</Link>
          </li>
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
