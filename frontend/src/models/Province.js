import uuid from 'uuid';

export default class Province {
  constructor(province, layer) {
    Object.keys(province).forEach((prop) => {
      this[prop] = province[prop];
    });
    this.mapLayer = layer;
    this.id = uuid();
  }
}
