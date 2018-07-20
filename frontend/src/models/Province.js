import { observable, action } from 'mobx';

export default class Province {
  @observable selected = true;

  constructor(province) {
    Object.keys(province).forEach((prop) => {
      this[prop] = province[prop];
    });
    this.id = this.ID;
  }

  @action setLayer = (layer) => {
    this.layer = layer;
  }

  @action toggleSelection = () => {
    this.selected = !this.selected;
  }
}
