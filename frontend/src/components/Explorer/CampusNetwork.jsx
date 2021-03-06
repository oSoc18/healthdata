import React from 'react';
import { observer } from 'mobx-react';
import Search from './Search';

const CampusNetwork = ({ store }) => {
  const { currentCampus, activeHospitalSearch } = store;

  const applyFilter = e => store.setActiveSearch(e.target.value);
  if (!currentCampus) {
    return (
      <div className="hospital-list">
        <Search placeholder="search for hospital campuses..." onChange={applyFilter} />
        <ul>
          {
            store.campuses
              .filter(c => c.name.toLowerCase().includes(activeHospitalSearch))
              .sort((c1, c2) => (c1.name > c2.name ? 1 : -1))
              .map(campus => (
                <li onClick={() => store.setCurrentCampus(campus)} key={campus.id}>{campus.name}</li>
              ))
          }
        </ul>
      </div>
    );
  }

  const othersInNetwork = currentCampus.hospital.campuses.filter(c => c.id !== currentCampus.id);
  return (
    <div className="hospital-list">
      <h3>
        {othersInNetwork.length > 0
          ? 'Other campuses for this hospital'
          : 'This hospital has no other campuses'}
      </h3>
      <ul>
        {
          othersInNetwork
            .sort((c1, c2) => (c1.name > c2.name ? 1 : -1))
            .map(campus => (
              <li onClick={() => store.setCurrentCampus(campus)} key={campus.id}>{campus.name}</li>
            ))
        }
      </ul>
    </div>
  );
};

export default observer(CampusNetwork);
