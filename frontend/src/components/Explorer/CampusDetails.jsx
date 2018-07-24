import React from 'react';
import PropTypes from 'prop-types';
import Campus from '../../models/Campus';

const CampusDetails = ({ campus, deselect }) => {
  if (!campus) {
    return (
      <div className="campus-details">
        <h3>Explore Belgium&#39;s Hospital data</h3>
        <p>
          Click the markers on the map to find out more about each hospital and hospital campus.
        </p>
      </div>
    );
  }

  return (
    <div className="campus-details">
      <button type="button" onClick={deselect}>&#60; back to overview</button>
      <div className="campus">
        <h3>{campus.name}</h3>
        <ul className="contact-information">
          <li>
            <i className="fa fa-link" />
            {campus.website || 'No known website'}
          </li>
          <li>
            <i className="fa fa-map-marker" />
            {campus.address}
          </li>
          <li>
            <i className="fa fa-globe" />
            {campus.province}
          </li>
          <li>
            <i className="fa fa-phone" />
            {campus.telephone}
          </li>
        </ul>
      </div>
    </div>
  );
};

CampusDetails.defaultProps = {
  campus: null
};

CampusDetails.propTypes = {
  campus: PropTypes.instanceOf(Campus),
  deselect: PropTypes.func.isRequired
};

export default CampusDetails;
