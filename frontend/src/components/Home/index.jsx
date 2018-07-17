import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <p>
    Home page.
    <br/>
    <Link to="/explorer">test</Link>
  </p>
);


export default Home;
