import React from 'react';
import '../../../assets/css/journey/journey.css';

class ComparisonSameAgeBelgium extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }

  componentDidMount() {
    fetch(`http://192.168.99.100:8000/api/depression?agegroup=${'15-24'}&year=2013`)
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
    return (<div>
      <div className="journey_content">
        <p>
          <span className="red bold"> {this.state.value}% </span> of people with depression from the same {this.state.age} group in Belgium
        </p>
        <button type="button" className="redButtonLink" onClick={() => this.props.onClick()}>Start your journey</button>
      </div>
    </div>
    );
  }

}



export default ComparisonSameAgeBelgium;
