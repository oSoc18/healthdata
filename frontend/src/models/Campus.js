export default class Campus {
  constructor(campus) {
    Object.keys(campus).forEach((prop) => {
      this[prop] = campus[prop];
    });
  }
}
