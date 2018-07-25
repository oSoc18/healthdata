import React from 'react';
import '../../../assets/css/journey/journey.css';
import CompVisualization from './compVisualization/CompVisualization';
import API from '../../../api/BaseAPI';

class ComparisonSameAgeBelgium extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      dataFromYear: "2013"
    }
    this.api = new API();

  }

  componentDidMount() {
    this.getData("2013");
  }

  async getData(year) {
    let data = await this.api.getComparisonData(`agegroup=${this.props.agegroup}&year=${year}`);
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
              <div style={{ padding: "1em" }}>

              </div>
              <div style={{ paddingRight: "1em" }}>
                <h1>Depression at  <span className="red bold">{this.props.agegroup}</span> years old</h1>
                <p>
                  <span className="red bold"> {this.state.value}% </span> of people with depression from the same {this.state.age} agegroup in <span className="bold">Belgium</span>.
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


    )
  }

}



export default ComparisonSameAgeBelgium;





{/* <div>
<div className="journey_content">
  <p>
    <span className="red bold"> {this.state.value}% </span> of people with depression from the same {this.state.age} agegroup in Belgium.
</p>
  <p>{this.state.value == "" ? "1" : <CompVisualization percent={this.state.value} />}</p>
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
</div> */}