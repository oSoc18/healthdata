import React, { Component } from 'react';
import Hospital from './models/Hospital';
import MapLeaflet from './components/MapLeaflet';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// CSS
import './assets/css/main.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hospitals: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:9001/hospitals.json')
      .then(r => r.json())
      .then((data) => {
        const hospitals = data.map(hospital => new Hospital(hospital));
        this.setState({ hospitals });
      });
  }

  render() {
    const { hospitals } = this.state;
    if (hospitals === null) {
      return (
        <div className="App">
          App loading...
        </div>
      );
    }

    return (
      <div className="App">
        <Navbar />
        <Sidebar />
        <MapLeaflet hospitals={hospitals} />
        <Footer />
      </div>
    );
  }
}

export default App;
