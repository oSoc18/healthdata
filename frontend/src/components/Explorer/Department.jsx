import React from 'react';
import PropTypes from 'prop-types';
import DepartmentModel from '../../models/Department';

const Department = ({ department }) => (
  <li className="department">
    <span>{department.name}</span>
    <div className="department-vis">
      <div className="bar">
        <span className="bar-inner" />
      </div>
      <span className="numBeds">1000</span>
    </div>

  </li>
);

Department.propTypes = {
  department: PropTypes.instanceOf(DepartmentModel).isRequired
};

export default Department;
