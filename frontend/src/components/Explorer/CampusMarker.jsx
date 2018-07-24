import React from 'react';
import PropTypes from 'prop-types';
import { CircleMarker, Popup } from 'react-leaflet';
import Campus from '../../models/Campus';

const CampusMarker = ({ campus, onCampusSelect }) => {
  const center = [campus.latitude, campus.longitude];
  return (
    <CircleMarker center={center} radius={2} color="#FF6464" onClick={() => { onCampusSelect(campus); }} />
    /* <Popup>
        {campus.name}
      </Popup>
    </CircleMarker> */
  );
};

CampusMarker.propTypes = {
  campus: PropTypes.instanceOf(Campus).isRequired,
  onCampusSelect: PropTypes.func.isRequired
};

export default CampusMarker;
