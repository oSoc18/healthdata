import React from 'react';
import '../../../assets/css/journey/journey.css';
import CompVisualization from './compVisualization/CompVisualization';
import API from '../../../api/BaseAPI';
import '../../../assets/css/journey/comparison.css';


class ComparisonPerAgePerProvince extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      dataFromYear: 2013
    }
    this.api = new API();

  }

  componentDidMount() {
    this.getData("2013");
  }

  async getData(year) {
    let data = await this.api.getComparisonData(`province=${this.props.province}&agegroup=${this.props.agegroup}&year=${year}`);
    this.processData(data, year);
  }

  processData(data, year) {
    let total = 0;
    let dataLength = data.length;

    for (let i = 0; i < dataLength; i++) {
      total += parseFloat(data[i].crude);
    }

    let avg = Math.round((total / dataLength) * 100) / 100;
    if (avg > 15 || avg < 3) {
      switch (year) {
        case "2013":
          this.getData("2008");
          break;
        case "2008":
          this.getData("2004");
        case "2004":
          this.getData("2001");
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

  }


  render() {
    return (
      <div className="comparisonP">
        <div className="flex-container">
          <div className="compContent">
            <div className="compContentContent flex-container">
              <div style={{ padding: "1em", width: "30%" }}>

              </div>
              <div style={{ paddingRight: "1em", width: "70%"  }}>
                <h1>Comparison per age per province</h1>
                <p> 
                  {this.props.name} might feel alone, but what {this.props.gender == "male" ? "he" : "she"} doesn't know is that many people around {this.props.gender == "male" ? "him" : "her"} suffer from dysthymia and have similar syptoms.
              In <span className="capitalize">{this.props.province}</span>, <span className="red bold">{this.state.value}%</span> of the population from {this.props.name}'s age group have similar symptoms.
            {/* What {this.props.name} does not know, is that many people around {this.props.gender == "male" ? "him" : "her"} also suffer from with current symptoms of a depressive disorder.
            In {this.props.province}, {this.state.value}% of the population from {this.props.name}'s age group have symptoms of a depressive disorder. */}
                </p>
              </div>

            </div>

          </div>
          <div className="compVis">
            <div className="compVisVis">
              <p>{this.state.value == "" ? "Loading visualization" : <CompVisualization percent={this.state.value} />}</p>
              <h1 className="red bold">{this.state.value}%</h1>
            </div>

          </div>
        </div >

        <div className="comparisonButtonAndFootnote">
          <p>
            <button type="button" className="redButtonLink" onClick={() => this.props.prev()}>
              <i className="fa fa-angle-left bold"></i> Go back
                  </button> <button type="button" className="redButtonLink" onClick={() => this.props.next()}>
              Continue <i className="fa fa-angle-right bold"></i>
            </button>
          </p>
          <p>
            Data from the Belgian Health Interview Survey, current symptoms of a depressive disorder. Year: {this.state.dataFromYear}
          </p>
        </div>
      </div>
    );

  }

}

export default ComparisonPerAgePerProvince;






// <div>
      //   <div className="comparisonP">
      //     <h1>Comparison per age per province</h1>
      //     <p>
      //       {this.props.name} might feel alone, but what {this.props.gender == "male" ? "he" : "she"} doesn't know is that many people around {this.props.gender == "him" ? "he" : "him"} suffer from dysthymia and have similar syptoms.
      //         In <span className="capitalize">{this.props.province}</span>, <span className="red bold">{this.state.value}%</span> of the population from {this.props.name}'s age group have similar symptoms.
      //       {/* What {this.props.name} does not know, is that many people around {this.props.gender == "male" ? "him" : "her"} also suffer from with current symptoms of a depressive disorder.
      //       In {this.props.province}, {this.state.value}% of the population from {this.props.name}'s age group have symptoms of a depressive disorder. */}
      //     </p>
      //     <p>Data is from: {this.state.dataFromYear}</p>
      //     <p>{this.state.value == "" ? "1" : <CompVisualization percent={this.state.value} />}</p>

      //     {/* What {this.props.name} does not know, is that many people around {this.props.gender == "male" ? "him" : "her"} also suffer from with current symptoms of a depressive disorder.
      //       In {this.props.province}, {this.state.value}% of the population from {this.props.name}'s age group have symptoms of a depressive disorder. */}
      //     <p>
      //       <button type="button" className="redButtonLink" onClick={() => this.props.prev()}>
      //         <i className="fa fa-angle-left bold"></i> Go back
      //           </button> <button type="button" className="redButtonLink" onClick={() => this.props.next()}>
      //         Continue <i className="fa fa-angle-right bold"></i>
      //       </button>
      //     </p>
      //   </div>
      // </div>













































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
