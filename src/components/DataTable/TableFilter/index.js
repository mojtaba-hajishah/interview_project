import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function TableFilter ({ 
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
}) {
  const handleChange = event => {
    onChange(event.target.value)
  }

  return (
    <div className="FilterTextField">
      <input
        className='FilterTextFieldInput'
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

TableFilter.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TableFilter;