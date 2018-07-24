import React from 'react';
import '../../../assets/css/journey/journey.css';


class ComparisonPerAgePerProvince extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      dataFromYear: 2013
    }
  }

  componentDidMount() {
    this.processData("2013");
  }

  processData(year) {
    fetch(`http://192.168.99.100:8000/api/depression?province=${this.props.province}&agegroup=${this.props.agegroup}&year=${year}`)
      .then(response => response.json())
      .then((data) => {
        console.log(data);

        let total = 0;
        let dataLength = data.length;
        for (let i = 0; i < dataLength; i++) {
          total += parseFloat(data[i].crude);
        }

        let avg = Math.round((total / dataLength) * 100) / 100;
        console.log(avg + "- " + year);
        if (avg > 15 || avg < 3) {
          switch (year) {
            case "2013":
              this.processData("2008");
              break;
            case "2008":
              this.processData("2004");
            case "2004":
              this.processData("2001");
            default:
              this.setState({
                value: avg
              })
              break;
          }
        }
        else {

          this.setState({ value: avg });
          this.setState({ dataFromYear: year })
        }

      });
  }


  render() {
    return (
      <div>
        <div className="journey_content">
          <h1>Comparison per age per province</h1>
          <p>
            What {this.props.name} does not know, is that many people around {this.props.gender == "male" ? "him" : "her"} also suffer from with current symptoms of a depressive disorder.
            In {this.props.province}, {this.state.value}% of the population from {this.props.name}'s age group have symptoms of a depressive disorder.
          </p>
          <p>Data is from: {this.state.dataFromYear}</p>
          <p>
            <button type="button" className="redButtonLink" onClick={() => this.props.prev()}>
              <i className="fa fa-angle-left bold"></i> Go back
                </button> <button type="button" className="redButtonLink" onClick={() => this.props.next()}>
              Continue <i className="fa fa-angle-right bold"></i>
            </button>
          </p>
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
