import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { observer } from 'mobx-react';
import bbox from '@turf/bbox';
import HospitalMarker from './HospitalMarker';
import provincesGeoJSON from '../../assets/data/be-provinces.geo.json';

import 'leaflet/dist/leaflet.css';
import '../../assets/css/explorer/map.css';

class MapLeaflet extends Component {
  constructor(props) {
    super(props);
    const bboxArray = bbox(provincesGeoJSON);
    const corner1 = [bboxArray[1], bboxArray[0]];
    const corner2 = [bboxArray[3], bboxArray[2]];
    this.state = {
      bounds: [corner1, corner2]
    };
  }
  render() {
    const { hospitals } = this.props.store;
    return (
      <Map
        className="leaflet-container"
        center={[50.52, 4.3517]}
        zoom={8}
        minZoom={8}
        maxZoom={17}
        maxBounds={this.state.bounds}
        maxBoundsViscosity={0.5}
      >
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={provincesGeoJSON}
          style={{
            color: '#FF6464',
            fillColor: 'transparent',
            weight: 1,
            opacity: 0.6
          }}
        />
        {
          hospitals.map(hospital => <HospitalMarker key={hospital.id} hospital={hospital} />)
        }
      </Map>
    );
  }
}

export default observer(MapLeaflet);
