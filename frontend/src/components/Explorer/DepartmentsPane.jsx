import React from 'react';
import { observer } from 'mobx-react';
import Department from './Department';

import '../../assets/css/explorer/departments.css';

const DepartmentsPane = ({ store }) => {
  const { currentCampus } = store;
  if (currentCampus) {
    if (!currentCampus.hospital.hasHistory) {
      return (
        <div className="departments-pane">
          <div className="loading">
            <span className="spin" />
            <h3>Getting data for {currentCampus.hospital.name}</h3>
          </div>
        </div>
      );
    }

    return (
      <div className="departments-pane">
        <h3>Amount of hospital beds for departments of {currentCampus.hospital.name}</h3>
        <ol className="departments-chart">
          {
            currentCampus.hospital.departments
              .sort((d1, d2) => d2.latestBeds - d1.latestBeds)
              .map(department => (
                <Department
                  key={department.id}
                  department={department}
                  maxBeds={currentCampus.hospital.latestMaximumBeds}
                />
              ))
          }
        </ol>
      </div>
    );
  }

  return (
    <div className="departments-pane">
      <h3>Amount of hospital beds in all departments</h3>
      <ol className="departments-chart">
        {
          store.departments
            .sort((d1, d2) => d2.latestBeds - d1.latestBeds)
            .map(department => (
              <Department
                key={department.id}
                department={department}
                maxBeds={store.latestMaximumBeds}
              />
            ))
        }
      </ol>
    </div>
  );
};

export default observer(DepartmentsPane);
