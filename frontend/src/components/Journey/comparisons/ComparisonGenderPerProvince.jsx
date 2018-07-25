import React from 'react';
import '../../../assets/css/journey/journey.css';


class ComparisonGenderPerProvince extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueM: "",
      dataFromYearM: 2013,
      valueF: "",
      dataFromYearF: 2013
    }
  }

  componentDidMount() {
    this.processDataF("2013");
    this.processDataM("2013");

  }

  processDataF(year) {
    fetch(`http://192.168.99.100:8000/api/depression?province=${this.props.province}&gender=F&year=${year}`)
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
              this.processDataF("2008");
              break;
            case "2008":
              this.processDataF("2004");
            case "2004":
              this.processDataF("2001");
            default:
              this.setState({
                valueF: avg
              })
              break;
          }
        }
        else {
          this.setState({ valueF: avg });
          this.setState({ dataFromYearF: year })
        }
      });
  }

  processDataM(year) {
    fetch(`http://192.168.99.100:8000/api/depression?province=${this.props.province}&gender=M&year=${year}`)
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
              this.processDataM("2008");
              break;
            case "2008":
              this.processDataM("2004");
            case "2004":
              this.processDataM("2001");
            default:
              this.setState({
                valueM: avg
              })
              break;
          }
        }
        else {
          this.setState({ valueM: avg });
          this.setState({ dataFromYearM: year })
        }
      });
  }


  render() {
    return (
      <div>
        <div className="journey_content">
          <p>
            In {this.props.province}, <span className="bold red"> {(this.state.valueF) ? this.state.valueF : "Loading "}%</span> of the women have those symptoms too, while <span className="bold red"> {(this.state.valueM) ? this.state.valueM : "Loading "}%</span> of men do.
          </p>
          <p>
            Year female data: {this.state.dataFromYearF} <br />
            Year male data:  {this.state.dataFromYearM}
          </p>
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

export default ComparisonGenderPerProvince;
