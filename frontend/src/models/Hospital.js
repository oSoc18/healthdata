import uuid from 'uuid';

export default class Hospital {
  constructor(hospital) {
    Object.keys(hospital).forEach((prop) => {
      this[prop] = hospital[prop];
    });
    this.id = uuid();
  }
}
