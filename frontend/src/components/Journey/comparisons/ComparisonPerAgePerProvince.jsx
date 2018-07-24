import React from 'react';
import '../../../assets/css/journey/journey.css';


class ComparisonPerAgePerProvince extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }

  componentDidMount() {

    fetch(`http://192.168.99.100:8000/api/depression?province=${this.props.province}&agegroup=${'15-24'}&year=2013`)
      .then(response => response.json())
      .then((data) => {
        console.log(data);

        let total = 0;
        let dataLength = data.length;
        for (let i = 0; i < dataLength; i++) {
          total += parseFloat(data[i].crude);
        }

        this.setState({
          value: Math.round((total / dataLength) * 100) / 100
        })
      });
  }

  render() {


    return (
      <div>
        <div className="journey_content">
          <h1>Comparison per age per province</h1>
          <p>
            <span className="bold red"> {(this.state.value) ? this.state.value : "Loading "}%</span> at the age of the <span className="red bold">{this.props.age}</span> year olds that live in {this.props.province} have depression.
          </p>
          <button type="button" className="redButtonLink" onClick={() => this.props.onClick()}>Start your journey</button>
        </div>
      </div>
    );

  }

}

export default ComparisonPerAgePerProvince;


















































// ============================================================


// let that = this;

// fetch('http://192.168.99.100:8000/api/depression?gender=M')
//   .then(
//     function (response) {
//       if (response.status !== 200) {
//         console.log('Looks like there was a problem. Status Code: ' +
//           response.status);
//         return;
//       }
//       response.json()
//         .then(function (data) {

//           // % of people with depression from the same age group and same province
//           let agePerProv = this.calcAverage(data.filter(item => item.agegroup == '15-24' && item.province == province));

//           // -% of women with depression in the province
//           let womenPerProv = this.calcAverage(data.filter(item => item.gender == 'F' && item.province == province));

//           // // -% of men with depression in the province
//           let menPerProv = this.calcAverage(data.filter(item => item.gender == 'M' && item.province == province));

//           // -% of people with depression from the same age group in Belgium
//           let perAge = this.calcAverage(data.filter(item => item.agegroup == '15-24'));

//           // -% of people with depression in the province
//           let perProv = this.calcAverage(data.filter(item => item.province == province));


//           const obj = {
//             agePerProv: agePerProv,
//             womenPerProv: womenPerProv,
//             menPerProv: menPerProv,
//             perAge: perAge,
//             perProv: perProv
//           }

//           that.setState({ results: obj });


//         })

//     }
//   )
//   .catch(function (err) {
//     console.log('Fetch Error :-S', err);
//   })
