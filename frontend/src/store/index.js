import { observable, configure } from 'mobx';

import API from '../api/BaseAPI';
import Hospital from '../models/Hospital';

configure({ enforceActions: true });

class Store {
  static init = async () => {
    const api = new API();
    const initialState = {};
    initialState.hospitals = await api.getHospitals();
    return new Store(initialState);
  };

  @observable hospitals = [];

  constructor({ hospitals }) {
    this.api = new API();
    this._addHospital(...hospitals);
  }

  _addHospital = (...hospitals) => {
    hospitals.forEach((hospital) => {
      this.hospitals.push(new Hospital(hospital));
    });
  }
}

export default Store;
