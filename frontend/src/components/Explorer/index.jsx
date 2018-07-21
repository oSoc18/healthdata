import React from 'react';
import Map from './Map';
import Navbar from '../Navbar';
import Sidebar from './Sidebar';
import Footer from '../Footer';

// CSS
import '../../assets/css/main.css';
import '../../assets/css/explorer/main.css';

const Explorer = ({ store }) => (
  <div className="App">
    <Navbar />
    <main>
      <Sidebar />
      <Map store={store} />
    </main>
    <Footer />
  </div>
);

export default Explorer;
