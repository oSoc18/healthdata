import React from 'react';
import '../../../assets/css/journey/journey.css';


const ComparisonPerAgePerProvince = props => (
  <div>
    <div className="journey_content">
      <p>
          -% of people with depression from the same age group and same province
      </p>
      <button type="button" className="redButtonLink" onClick={() => props.onClick()}>Start your journey</button>
    </div>
  </div>
);

export default ComparisonPerAgePerProvince;
