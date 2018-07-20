import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { observer } from 'mobx-react';
import HospitalMarker from './HospitalMarker';
import provincesGeoJSON from '../../assets/data/be-provinces.geo.json';

import 'leaflet/dist/leaflet.css';
import '../../assets/css/explorer/map.css';

const MapLeaflet = ({ store }) => {
  const { hospitals } = store;
  return (
    <Map className="leaflet-container" center={[50.52, 4.3517]} zoom={8} dragging={false} zoomControl={false} scrollWheelZoom={false}>
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={provincesGeoJSON}
        style={{
          fillColor: 'yellow',
          weight: 3,
          opacity: 0.65
        }}
      />
      {
        hospitals.map(hospital => <HospitalMarker key={hospital.id} hospital={hospital} />)
      }
    </Map>
  );
};

export default observer(MapLeaflet);
