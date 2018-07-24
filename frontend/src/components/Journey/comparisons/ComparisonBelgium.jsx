import React from 'react';
import '../../../assets/css/journey/journey.css';

class ComparisonBelgium extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Fabian',
      age: 10,
      isMale: false,
      province: 'West-Flanders'
    };
  }


  render() {
    return (
      <div>
        <div className="journey_content">
          <h1>Comparison over Belgium</h1>
          <p>
            Meanwhile, Belgium counts 703,700 people with depression, which is more than the inhabitants of Antwerp AND Namur combined (show city of antwerp and Namur).
            (0.062*11,350,000=703,700 people in Belgium in 2017; Antwerp = 520,000; Namur=110,000 -> We can say “more than the inhabitants of Antwerp and Namur combined”).
          </p>
          <button type="button" className="redButtonLink" onClick={() => this.props.onClick()}>Start your journey</button>
        </div>
      </div>
    );
  }
}

export default ComparisonBelgium;
