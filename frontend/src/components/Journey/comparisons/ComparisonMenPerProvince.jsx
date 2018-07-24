import React from 'react';
import '../../../assets/css/journey/journey.css';

const ComparisonMenPerProvince = props => (
  <div>
    <div className="journey_content">
      <p>-% of men with depression in the province</p>
      <button type="button" className="redButtonLink" onClick={() => props.onClick()}>
        Start your journey
      </button>
    </div>
  </div>
);

export default ComparisonMenPerProvince;
