import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import bbox from '@turf/bbox';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import CampusMarker from './CampusMarker';
import provincesGeoJSON from '../../assets/data/be-provinces.geo.json';

import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import '../../assets/css/explorer/map.css';

class MapLeaflet extends Component {
  campusSelectReaction = reaction(
    () => this.props.store.currentCampus,
    (campus) => {
      this.map.leafletElement.flyTo([campus.latitude, campus.longitude]);
      this.map.leafletElement.setZoom(11);
    }
  );

  constructor(props) {
    super(props);
    const bboxArray = bbox(provincesGeoJSON);
    const corner1 = [bboxArray[1], bboxArray[0]];
    const corner2 = [bboxArray[3], bboxArray[2]];
    this.state = {
      bounds: [corner1, corner2]
    };
  }

  onCampusSelect = (campus) => {
    this.props.store.setCurrentCampus(campus);
  }

  render() {
    const { campuses } = this.props.store;
    return (
      <Map
        ref={(c) => { this.map = c; }}
        className="leaflet-container"
        center={[50.52, 4.3517]}
        zoom={8}
        minZoom={8}
        maxZoom={17}
        maxBounds={this.state.bounds}
        maxBoundsViscosity={0.5}
        attributionControl={false}
        useFlyTo
      >
        <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png" />
        <GeoJSON
          data={provincesGeoJSON}
          style={{
            color: '#FF6464',
            fillColor: 'transparent',
            weight: 1,
            opacity: 0.6
          }}
        />
        <MarkerClusterGroup
          disableClusteringAtZoom={10}
          spiderfyOnMaxZoom={false}
          showCoverageOnHover={false}
        >
          {
            campuses.map(campus => (
              <CampusMarker
                key={campus.id}
                campus={campus}
                onCampusSelect={this.onCampusSelect}
              />
            ))
          }
        </MarkerClusterGroup>
      </Map>
    );
  }
}

export default observer(MapLeaflet);
