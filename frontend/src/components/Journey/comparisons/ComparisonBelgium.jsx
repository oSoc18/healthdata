import React from 'react';
import '../../../assets/css/journey/journey.css';
import imgBelgium from '../../../assets/images/belgiumNamurAntwerp.png';

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
      <div className="comparisonP">
        <div className="flex-container">
          <div className="compContent">
            <div className="compContentContent flex-container">
              <div style={{ padding: "1em", width: "30%" }}>

              </div>
              <div style={{ paddingRight: "1em", width: "70%" }}>
                <h1>Overall Belgium</h1>
                <p>
                  <span className="bold red">Belgium</span> counts <span className="bold red">703,700 people with depression</span>, which is more than the inhabitants of Antwerp and Namur combined.
                  {/* (0.062*11,350,000=703,700 people in Belgium in 2017; Antwerp = 520,000; Namur=110,000 -> We can say “more than the inhabitants of Antwerp and Namur combined”). */}
                </p>
              </div>

            </div>

          </div>
          <div className="compVis">
            <div className="compVisVis">
              <img src={imgBelgium} alt="Map of Belgium"/>
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
        </div>
      </div>
    );
  }
}

export default ComparisonBelgium;




{/* <div>
<div className="journey_content">
  <h1>Comparison over Belgium</h1>
  <p>
    Meanwhile, Belgium counts 703,700 people with depression, which is more than the inhabitants of Antwerp AND Namur combined (show city of antwerp and Namur).
    (0.062*11,350,000=703,700 people in Belgium in 2017; Antwerp = 520,000; Namur=110,000 -> We can say “more than the inhabitants of Antwerp and Namur combined”).
  </p>
  <p>
    <button type="button" className="redButtonLink" onClick={() => this.props.prev()}>
      <i className="fa fa-angle-left bold"></i> Go back
        </button> <button type="button" className="redButtonLink" onClick={() => this.props.next()}>
      Continue <i className="fa fa-angle-right bold"></i>
    </button>
  </p>
</div>
</div> */}