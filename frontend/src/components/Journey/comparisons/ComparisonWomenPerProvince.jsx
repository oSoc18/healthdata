import React from 'react';
import '../../../assets/css/journey/journey.css';


class ComparisonWomenPerProvince extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }

  componentDidMount() {
    fetch(`http://192.168.99.100:8000/api/depression?province=${this.props.province}&gender=F&year=2013`)
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
          <p> <span className="bold red"> {(this.state.value) ? this.state.value : "Loading "}%</span> of <span className="red bold">women</span> have depression in <span className="red bold">{this.props.province}</span></p>
          <button type="button" className="redButtonLink" onClick={() => this.props.onClick()}>Start your journey</button>
        </div>
      </div>
    );
  }
}

export default ComparisonWomenPerProvince;
