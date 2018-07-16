import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer } from 'react-leaflet';
import HospitalMarker from './HospitalMarker';
import Hospital from '../models/Hospital';

import 'leaflet/dist/leaflet.css';
import '../assets/css/map.css';

const MapLeaflet = ({ hospitals }) => {
  const position = [50.5039, 4.4699];
  return (
    <Map className="leaflet-container" center={position} zoom={8} dragging={false} zoomControl={false} scrollWheelZoom={false}>
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      />
      {
        hospitals.map(hospital => <HospitalMarker key={hospital.id} hospital={hospital} />)
      }
    </Map>
  );
};

MapLeaflet.propTypes = {
  hospitals: PropTypes.arrayOf(PropTypes.instanceOf(Hospital)).isRequired
};

export default MapLeaflet;
