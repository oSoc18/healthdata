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
              <div className="pwhite">
            Get insights into cancer and <span className="bold">depression</span> in Belgium,
            and compare them yourself to the public.
                  </div>
          </p>
            
            <p>
            <Link to="/journey"><span className="buttonwhite">Take me on a journey </span><i className="fa fa-angle-right bold" /></Link>
            </p>
            
        </div>
        <div className="mainExplorer">
          <h1>Get insights in Belgian hospital data</h1>
          <p>
              <div className="pblack">
                  Get insights into data from all <span className="bold">Belgian hospitals.</span>
              </div>
          </p>
            <Link to="/explorer"><span className="buttonred">Explore on my own</span> <i className="fa fa-angle-right bold" /></Link><br />
        </div>

      </div>
      <div className="mainRight">
        <div className="twohuman"></div>
      </div>
    </div>
  </div>
);


export default Home;
