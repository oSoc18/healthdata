import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import '../assets/css/Map.css';

class MapLeaflet extends Component {
  constructor() {
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09
    };
  }

  render() {
    const { lat, lng } = this.state;
    const position = [lat, lng];
    return (
      <Map className="leaflet-container" center={position} zoom={13}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default MapLeaflet;
