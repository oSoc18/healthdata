import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Department from './Department';
import Search from './Search';

import '../../assets/css/explorer/departments.css';

class DepartmentsPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSearch: ''
    };
  }

  applyFilter = e => this.setState({ activeSearch: e.target.value });

  render() {
    const { store } = this.props;
    const { currentCampus } = store;
    const { activeSearch } = this.state;

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
          <Search placeholder="search for departments..." onChange={this.applyFilter} />
          <ol className="departments-chart">
            {
              currentCampus.hospital.departments
                .filter(d => d.name.toLowerCase().includes(activeSearch))
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
        <Search placeholder="search for departments..." onChange={this.applyFilter} />
        <ol className="departments-chart">
          {
            store.departments
              .filter(d => d.name.toLowerCase().includes(activeSearch))
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
  }
}

export default observer(DepartmentsPane);
