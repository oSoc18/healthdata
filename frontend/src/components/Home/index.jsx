import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

import '../../assets/css/journey/main.css';

const Home = () => (

  <div>
    <Navbar />

    <div className="flex-container">
      <div className="mainLeft">
        <div className="mainJourney">
          <h1>You are not alone</h1>
          <p>
            Get insights into cancer and depression in Belgium,
            and compare them yourself to the public.
          </p>
          <Link to="/journey">Take me on a journey <i className="fa fa-angle-right bold" /></Link>
        </div>
        <div className="mainExplorer">
          <h1>Get insights in Belgian hospital data</h1>
          <p>
            Get insights into data from all Belgian hospitals.
          </p>
          <Link to="/explorer">Explore on my own <i className="fa fa-angle-right bold" /></Link><br />
        </div>

      </div>
      <div className="mainRight">
        Img will come here
      </div>
    </div>
  </div>
);


export default Home;
