export default class BaseAPI {
  constructor() {
    this.BASE_URL = process.env.REACT_APP_API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }

  getHospitals() {
    return fetch(`${this.BASE_URL}/hospitals`, { headers: this.headers }).then(r => r.json());
  }
}
