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
}
