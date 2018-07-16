import React, { Component } from 'react';
import MapLeaflet from './components/MapLeaflet';
import Hospital from './models/Hospital';

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
        <MapLeaflet hospitals={hospitals} />
      </div>
    );
  }
}

export default App;
