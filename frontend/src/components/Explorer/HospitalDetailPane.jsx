import React from 'react';
import { observer } from 'mobx-react';
import CampusDetails from './CampusDetails';
import CampusNetwork from './CampusNetwork';

import '../../assets/css/explorer/hospital-detail.css';

const HospitalDetailPane = ({ store }) => (
  <div className="hospital-detail-pane">
    <CampusDetails campus={store.currentCampus} deselect={() => store.deselectCampus()} />
    <CampusNetwork store={store} />
  </div>
);

export default observer(HospitalDetailPane);
