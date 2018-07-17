import React, { Component } from 'react';
import Hospital from '../../models/Hospital';
import MapLeaflet from './MapLeaflet';
import Navbar from '../Navbar';
import Sidebar from './Sidebar';
import Footer from '../Footer';

// CSS
import '../../assets/css/main.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hospitals: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:9000/hospitals.json')
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
