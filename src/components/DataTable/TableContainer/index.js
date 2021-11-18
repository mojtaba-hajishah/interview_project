import React from 'react';
import './styles.css';

const TableContainer = (props) => {
  return (
    <div className='TableContainer'>
      {props.children}
    </div>
  );
};

export default TableContainer;