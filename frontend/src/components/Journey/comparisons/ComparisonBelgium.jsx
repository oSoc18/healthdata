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
            In 2017, Belgium counted <span className="bold red">703,700</span> individuals with symptoms of depressive disorder, which is more than the inhabitants of Antwerp and Namur combined.
            {/* (0.062*11,350,000=703,700 people in Belgium in 2017; Antwerp = 520,000; Namur=110,000 -> We can say “more than the inhabitants of Antwerp and Namur combined”). */}
          </p>
          <div className="namurAntwerp"></div>
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

export default ComparisonBelgium;
