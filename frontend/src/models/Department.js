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
  }

  @computed get latestBeds() {
    const year = Object.keys(this.history).sort((y1, y2) => y1 < y2)[0];
    return this.history[year].sort((m1, m2) => m1 < m2)[0].total;
  }
}
