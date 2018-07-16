import React from 'react';
import PropTypes from 'prop-types';
import { CircleMarker, Popup } from 'react-leaflet';
import Hospital from '../models/Hospital';

const HospitalMarker = ({ hospital }) => {
  const center = [hospital.lat, hospital.long];
  return (
    <CircleMarker center={center} radius={3}>
      <Popup>
        {hospital.hospital}
      </Popup>
    </CircleMarker>
  );
};

HospitalMarker.propTypes = {
  hospital: PropTypes.instanceOf(Hospital).isRequired
};

export default HospitalMarker;
