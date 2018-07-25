import uniqid from 'uniqid';
import { computed } from 'mobx';

export default class Department {
  constructor(department) {
    Object.keys(department).forEach((prop) => {
      this[prop] = department[prop];
    });
    this.history = this.beds.reduce((acc, historicalData) => {
      acc[historicalData.year] = acc[historicalData.year] || [];
      acc[historicalData.year].push(historicalData);
      return acc;
    }, {});
    if (!this.id) this.id = uniqid();
  }

  @computed get latestBeds() {
    const year = Object.keys(this.history).sort((y1, y2) => y1 < y2)[0];
    const beds = this.history[year].sort((y1, y2) => y1.month < y2.month)[0];
    return beds.total || beds.amount;
  }
}
