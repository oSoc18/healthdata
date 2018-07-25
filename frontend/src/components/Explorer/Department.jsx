import React from 'react';
import PropTypes from 'prop-types';
import DepartmentModel from '../../models/Department';

const Department = ({ department, maxBeds }) => {
  const barWidth = `${(100 * department.latestBeds) / maxBeds}%`;
  return (
    <li className="department">
      <span>{department.name}</span>
      <div className="department-vis">
        <div className="bar">
          <span className="bar-inner" style={{ width: barWidth }} />
        </div>
        <span className="numBeds">{department.latestBeds}</span>
      </div>
    </li>
  );
};

Department.propTypes = {
  department: PropTypes.instanceOf(DepartmentModel).isRequired,
  maxBeds: PropTypes.number.isRequired
};

export default Department;
