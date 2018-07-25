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

  getComparisonData(url) {
    return fetch(`${this.BASE_URL}/depression?` + url).then(response => response.json());
  }
}




// fetch(`http://192.168.99.100:8000/api/depression?province=${this.props.province}&year=${year}`)
// .then(response => response.json())
// .then((data) => {
//     console.log(data);

//     let total = 0;
//     let dataLength = data.length;
//     for (let i = 0; i < dataLength; i++) {
//         total += parseFloat(data[i].crude);
//     }

//     let avg = Math.round((total / dataLength) * 100) / 100;
//     console.log(avg + "- " + year);
//     if (avg > 15 || avg < 3) {
//         switch (year) {
//             case "2013":
//                 this.processData("2008");
//                 break;
//             case "2008":
//                 this.processData("2004");
//             case "2004":
//                 this.processData("2001");
//             default:
//                 this.setState({
//                     value: avg
//                 })
//                 break;
//         }
//     }
//     else {
//         this.setState({ value: avg });
//         this.setState({ dataFromYear: year })
//     }

// });