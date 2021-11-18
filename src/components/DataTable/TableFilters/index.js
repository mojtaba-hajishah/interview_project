import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function TableFilters ({ children, clearFilters }) {
  return (
    <div className='Paper TableFiltersContainer'>
      <div className='TableFilters'>
        {children}
      </div>
      <button onClick={clearFilters} className="ClearFiltersButton">پاک کردن فیلتر ها</button>
    </div>
  );
};

TableFilters.propTypes = {
  clearFilters: PropTypes.func.isRequired,
}

export default TableFilters;