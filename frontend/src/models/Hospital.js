import { observable, action } from 'mobx';
import Campus from './Campus';

export default class Hospital {
  @observable campuses = [];

  constructor(hospital) {
    Object.keys(hospital).forEach((prop) => {
      this[prop] = hospital[prop];
    });
  }

  @action
  addCampus = (...campuses) => {
    campuses.forEach((campus) => {
      this.campuses.push(new Campus(campus));
    });
  }
}
