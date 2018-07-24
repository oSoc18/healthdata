import React from 'react';
import imgLogo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

import '../assets/css/nav.css';

const Navbar = () => (
  <div>
    <nav>
      <ul>
        <li>
          <img src={imgLogo} alt="img of logo" />
          {/* <Link to="/"><img src={imgLogo} alt="img of logo" /></Link> */}
        </li>
        <li>
          <Link to="/" className="title">HealthStory</Link>
          {/* <a href="#" className="title">HealthStory</a> */}
        </li>
        <li className="right">
          <Link to="/journey" className="selected">data journey</Link>
        </li>
        <li className="right">
          {/* <a href="#" className="selected">data journey</a> */}
          <Link to="/explorer">data explorer</Link>

        </li>
      </ul>
    </nav>
  </div>
);


export default Navbar;
