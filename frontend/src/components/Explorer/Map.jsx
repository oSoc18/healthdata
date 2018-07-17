import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import HospitalMarker from './HospitalMarker';
import Hospital from '../../models/Hospital';
import provinces from '../../assets/data/be-provinces.geo.json';

import 'leaflet/dist/leaflet.css';
import '../../assets/css/explorer/map.css';

const MapLeaflet = ({ hospitals }) => {
  const position = [50.52, 4.3517];

  const getColor = feature => ((feature.properties.TX_PROV_DESCR_NL === 'Provincie Antwerpen') ? 'red' : 'yellow');
  const styleMap = feature => ({
    fillColor: getColor(feature),
    weight: 3,
    opacity: 0.65
  });

  return (
    <Map className="leaflet-container" center={position} zoom={8} dragging={false} zoomControl={false} scrollWheelZoom={false}>
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={provinces}
        style={styleMap}
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
