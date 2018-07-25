import React from 'react';
import { observer } from 'mobx-react';
import Map from './Map';
import Navbar from '../Navbar';
import HospitalDetailPane from './HospitalDetailPane';
import DepartmentsPane from './DepartmentsPane';

import '../../assets/css/main.css';
import '../../assets/css/explorer/main.css';

const Explorer = ({ store }) => (
  <div className="App">
    <Navbar active="explorer" />
    {store.initialized ? (
      <main>
        <HospitalDetailPane store={store} />
        <Map store={store} />
        <DepartmentsPane store={store} />
      </main>
    ) : (
      <main className="loading">
        <span className="spin" />
        <h3>HealthStory Explorer is loading...</h3>
      </main>
    )}
  </div>
);

export default observer(Explorer);
