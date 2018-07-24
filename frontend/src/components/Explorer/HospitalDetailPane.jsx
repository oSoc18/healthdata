import React from 'react';
import CampusDetails from './CampusDetails';
import CampusNetwork from './CampusNetwork';

import '../../assets/css/explorer/hospital-detail.css';

const HospitalDetailPane = () => (
  <div className="hospital-detail-pane">
    <CampusDetails />
    <CampusNetwork />
  </div>
);

export default HospitalDetailPane;
