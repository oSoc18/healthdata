import React, { Component } from 'react';
import BaseAPI from '../../api/BaseAPI';
import Hospital from '../../models/Hospital';
import Map from './Map';
import Navbar from '../Navbar';
import Sidebar from './Sidebar';
import Footer from '../Footer';

// CSS
import '../../assets/css/main.css';
import '../../assets/css/explorer/main.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hospitals: null
    };
  }

  componentDidMount() {
    new BaseAPI().getHospitals()
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
        <main>
          <Sidebar />
          <Map hospitals={hospitals} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
