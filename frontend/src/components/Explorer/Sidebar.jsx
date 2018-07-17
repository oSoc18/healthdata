import React from 'react';

import '../../assets/css/sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
    <button type="button" className="right closeButton">
      &#10006;
    </button>
    <h1>
      Welcome to HomoBelgicus
    </h1>
    <p>
      Find out more information about Belgian hospitals.
    </p>
    <p>
      Hover over the pinpoints to find out basic information
      and click to see all of their interesting data.
    </p>
  </div>
);


export default Sidebar;
