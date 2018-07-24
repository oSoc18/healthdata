import React from 'react';
import '../../../assets/css/journey/journey.css';

class ComparisonSameAgeBelgium extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      dataFromYear: "2013"
    }
  }

  componentDidMount() {
    this.processData("2013");
  }

  processData(year) {
    fetch(`http://192.168.99.100:8000/api/depression?agegroup=${this.props.agegroup}&year=${year}`)
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
    return (<div>
      <div className="journey_content">
        <p>
          <span className="red bold"> {this.state.value}% </span> of people with depression from the same {this.state.age} group in Belgium
        </p>
        <p>Year: {this.state.dataFromYear}</p>

        <button type="button" className="redButtonLink" onClick={() => this.props.onClick()}>
          Continue <i className="fa fa-angle-right bold"></i>
        </button>
      </div>
    </div>
    );
  }

}



export default ComparisonSameAgeBelgium;
