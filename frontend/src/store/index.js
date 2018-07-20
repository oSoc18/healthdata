import { observable, configure } from 'mobx';

import API from '../api/BaseAPI';
import Hospital from '../models/Hospital';
import Province from '../models/Province';

configure({ enforceActions: true });

class Store {
  demographics = [];
  hospitals = [];
  @observable provinces = [];

  static init = async () => {
    const api = new API();
    const initialState = {};
    initialState.demographics = await api.getDemographics();
    initialState.hospitals = await api.getHospitals();
    return new Store(initialState);
  };

  constructor({ demographics, hospitals }) {
    this.api = new API();
    this.demographics = [...demographics];
    this._addHospital(...hospitals);
  }

  _addHospital = (...hospitals) => {
    hospitals.forEach((hospital) => {
      this.hospitals.push(new Hospital(hospital));
    });
  }

  addProvince = (...provinces) => {
    provinces.forEach((province) => {
      this.provinces.push(new Province(province.properties));
    });
  }
}

export default Store;
