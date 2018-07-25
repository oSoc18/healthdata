import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ placeholder, onChange }) => (
  <input type="search" placeholder={placeholder} onChange={onChange} />
);

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Search;
