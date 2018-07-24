export default class Department {
  constructor(department) {
    Object.keys(department).forEach((prop) => {
      this[prop] = department[prop];
    });
  }
}
