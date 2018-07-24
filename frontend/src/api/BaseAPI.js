export default class BaseAPI {
  constructor() {
    this.BASE_URL = process.env.REACT_APP_API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }

  getCampuses() {
    return fetch(`${this.BASE_URL}/hospitals/`, { headers: this.headers }).then(r => r.json());
  }

  getHospitals() {
    return fetch(`${this.BASE_URL}/hospital-networks/`, { headers: this.headers }).then(r => r.json());
  }

  getDepartments() {
    return fetch(`${this.BASE_URL}/departments/`, { headers: this.headers }).then(r => r.json());
  }

  getHospitalDetail(id) {
    return fetch(`${this.BASE_URL}/hospital-networks/${id}/beds`, { headers: this.headers }).then(r => r.json());
  }
}
