import { observable, action, computed } from 'mobx';
import Campus from './Campus';
import Department from './Department';

export default class Hospital {
  @observable campuses = [];
  @observable hasHistory = false;
  departments = [];

  constructor(hospital) {
    Object.keys(hospital).forEach((prop) => {
      this[prop] = hospital[prop];
    });
  }

  @computed get latestMaximumBeds() {
    return Math.max(...this.departments.map(dep => dep.latestBeds));
  }

  @action
  addCampus = (...campuses) => {
    campuses.forEach((campus) => {
      campus.hospital = this;
      this.campuses.push(new Campus(campus));
    });
  }

  @action
  _addDepartment = (...departments) => {
    departments.forEach((department) => {
      if (department.name === 'Total Results') return;
      this.departments.push(new Department(department));
    });
  }

  @action
  setHistory = (history) => {
    const departments = history.reduce((acc, historicalData) => {
      acc[historicalData.department.name] = acc[historicalData.department.name] || [];
      acc[historicalData.department.name].push(historicalData);
      return acc;
    }, {});
    Object.keys(departments).forEach((depName) => {
      const department = {
        name: depName,
        beds: departments[depName]
      };
      this._addDepartment(department);
    });
    this.hasHistory = true;
  }
}
