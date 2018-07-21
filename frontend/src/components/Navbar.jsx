import React from 'react';
import imgLogo from '../assets/images/logo.png';

import '../assets/css/nav.css';

const Navbar = () => (
  <div>
    <nav>
      <ul>
        <li>
          <img src={imgLogo} alt="img of logo" />
        </li>
        <li>
          <a href="#" className="title">HealthStory</a>
        </li>
        <li className="right">
          <a href="#">nl</a>
        </li>
        <li className="right">
          <a href="#" className="selected">eng</a>
        </li>
        <li className="right">
          <a href="#">fr</a>
        </li>
      </ul>
    </nav>
  </div>
);


export default Navbar;
