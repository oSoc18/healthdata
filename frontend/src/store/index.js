import { observable, action, computed, configure, runInAction } from 'mobx';

import API from '../api/BaseAPI';
import allDepartments from '../assets/data/departments.json';
import Hospital from '../models/Hospital';
import Department from '../models/Department';

configure({ enforceActions: true });

class Store {
  @observable hospitals = [];
  @observable departments = [];
  @observable currentCampus = null;
  @observable initialized = false;

  constructor() {
    this.api = new API();
  }

  initialize = async () => {
    const hospitals = await this.api.getHospitals();
    this._addHospital(...hospitals);

    const campuses = await this.api.getCampuses();
    campuses.map(this._addCampusToHospital);

    this._addDepartment(...allDepartments);
    // Takes ~ 20 seconds to load -> disabled until optimized
    /*
    const departments = await this.api.getDepartments();
    this.departments = this._addDepartment(...departments);
    */
    runInAction('Explorer ready', () => {
      this.initialized = true;
    });
  }

  @action
  _addHospital = (...hospitals) => {
    hospitals.forEach((hospital) => {
      this.hospitals.push(new Hospital(hospital));
    });
  }

  @action
  _addCampusToHospital = (campus) => {
    const hospital = this.hospitals.find(hospi => hospi.id === campus.network);
    hospital.addCampus(campus);
  }

  @action
  _addDepartment = (...departments) => {
    departments.forEach((department) => {
      if (department.name === 'Total Results') return;
      this.departments.push(new Department(department));
    });
  }

  @computed get campuses() {
    let res = [];
    this.hospitals.forEach((hospital) => {
      res = res.concat(hospital.campuses);
    });
    return res;
  }

  @action
  setCurrentCampus(campus) {
    this.currentCampus = campus;
  }

  @action
  deselectCampus() {
    this.currentCampus = null;
  }

  @computed get latestMaximumBeds() {
    return Math.max(...this.departments.map(dep => dep.latestBeds));
  }
}

export default Store;
