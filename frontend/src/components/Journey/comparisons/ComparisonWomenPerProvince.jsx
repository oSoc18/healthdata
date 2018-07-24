import React from 'react';
import '../../../assets/css/journey/journey.css';


const ComparisonWomenPerProvince = props => (
  <div>
    <div className="journey_content">
      <p>-% of women with depression in the province</p>
      <button type="button" className="redButtonLink" onClick={() => props.onClick()}>Start your journey</button>
    </div>
  </div>
);

export default ComparisonWomenPerProvince;
