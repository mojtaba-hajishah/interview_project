import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function TableBody({rows}) {
  return (
    <tbody className="TableBody">
      {rows.map(item => (
        <tr key={item.id} className="TableBodyRow">
          <td className="TableBodyCell">{item.id}</td>
          <td className="TableBodyCell">{item.name}</td>
          <td className="TableBodyCell">{item.date}</td>
          <td className="TableBodyCell">{item.title}</td>
          <td className="TableBodyCell">{item.field}</td>
          <td className="TableBodyCell">{item.old_value}</td>
          <td className="TableBodyCell">{item.new_value}</td>
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    old_value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    new_value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
}

export default TableBody;