import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

// import image from 'images/twohuman.png';

import '../../assets/css/journey/main.css';

import mainImage from '../../assets/images/twohuman.png';

const Home = () => (
  <div className="App">
    <Navbar active="none" />

    <div className="flex-container">
      <div className="mainLeft">
        <div className="mainJourney">
          <h1>You are not alone</h1>
          <p>
            <div className="pwhite">
              Get insight in cancer and <span className="bold">depression</span> data in Belgium and compare the general results with your own.
              {/* Get insights in cancer and depression in Belgium,
              and compare them yourself to the public. */}
            </div>
          </p>

          <p>
            <Link to="/journey" className="journey-button">Take me on a journey<i className="fa fa-angle-right bold" /></Link>
          </p>

          {/* <div className="pwhite">
            Get insights into cancer and <span className="bold">depression</span> in Belgium,
            and compare them yourself to the public.
                  </div>
          </p>

            <p>
            <Link to="/journey"><span className="buttonwhite">Take me on a journey </span><i className="fa fa-angle-right bold" /></Link>
            </p> */}

        </div>
        <div className="mainExplorer">
          <h1>Get insights in Belgian hospital data</h1>
          <p>
            <div className="pblack">
              Get insights in data from all <span className="bold">Belgian hospitals.</span>
            </div>
          </p>
          <Link to="/explorer" className="explore-button">Explore on my own<i className="fa fa-angle-right button-text bold" /></Link><br />
          {/* <div className="pblack">
                  Get insights into data from all <span className="bold">Belgian hospitals.</span>
              </div>
          </p>
            <Link to="/explorer"><span className="buttonred">Explore on my own</span> <i className="fa fa-angle-right bold" /></Link><br /> */}
        </div>

      </div>
      <div className="mainRight">
        <div className="twohuman">
          <img src={mainImage} alt="welcome" width="524" height="578" />
        </div>
      </div>
    </div>
  </div>
);


export default Home;
