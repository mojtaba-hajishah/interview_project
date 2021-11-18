import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function TableHead ({ columns, sort, onSortChange }) {
  const {by, order} = sort;
  
  // handle sort change
  const handleSortChange = (fieldName) => () => {
    // if already sorted by this field, toggle sort order
    if(by === fieldName) {
      onSortChange({
        by,
        order: order === 'desc' ? 'asc' : 'desc'
      })
    } else {
      // else, apply sort by this field
      onSortChange({
        by: fieldName,
        order,
      })
    }
  }

  return (
    <>
    <thead className="TableHead">
      <tr role="row" className="TableHeadRow">
        {columns.map((item) => {
          return (
            <th role="columnheader" className='TableHeadCell' key={item.id}>
              <span className={`TableHeadCellButton ${by === item.name ? 'TableHeadCellButtonActive' : ''}`} { ...(item.sort && {onClick: handleSortChange(item.name) } ) } >
                {item.label}
                <svg className={`TableHeadCellButtonArrow ${by === item.name ? 'TableHeadCellButtonArrowActive' : ''} ${(by === item.name && order === 'asc') ? 'TableHeadCellButtonArrowAsc' : ''}` } focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></svg>
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
    </>
  );
};

TableHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sort: PropTypes.bool.isRequired,
  })),
}

export default TableHead;