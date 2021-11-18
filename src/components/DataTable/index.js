import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContainer from './TableContainer';
import TableFilters from './TableFilters';
import TableFilter from './TableFilter';
import TableHead from './TableHead';
import TableBody from './TableBody';
import './styles.css';
import { sortRows } from '../../functions/sort';
import { filterRows } from '../../functions/filter';
import { BinarySearchTree } from '../../functions/binarySearchTree';
import { getSearchParamItem } from '../../functions/searchParams';

// create a bst
const bst = new BinarySearchTree();

// table columns
const columns = [
  { id: 1, label: 'شماره', name: 'id', sort: true, },
  { id: 2, label: 'نام تغییر دهنده', name: 'name', sort: true, },
  { id: 3, label: 'تاریخ', name: 'date', sort: true },
  { id: 4, label: 'نام آگهی', name: 'title', sort: true },
  { id: 5, label: 'فیلد', name: 'field', sort: true },
  { id: 6, label: 'مقدار قدیمی', name: 'old_value', sort: true, },
  { id: 7, label: 'مقدار جدید', name: 'new_value', sort: true, },
];

// table component
function DataTable ({ rows }) {
  const [tableRows, setTableRows] = useState(rows);
  // const [favourites, setFavourites] = useState(getFavourites());
  const [filters, setFilters] = useState({
    name: '',
    date: '',
    title: '',
    field: '',
  });
  const [sort, setSort] = useState({
    by: 'id',
    order: 'desc',
  })

  // init hook - on mount
  useEffect(() => {
    // insert rows into bst using date as key
    rows.forEach((item) => {
      bst.insert(new Date(item.date).setHours(0, 0, 0, 0), item);
    });

    const name = getSearchParamItem('name'); 
    const title = getSearchParamItem('title'); 
    const field = getSearchParamItem('field'); 
    const date = getSearchParamItem('date'); 
    const sortBy = getSearchParamItem('sortBy'); 
    const sortOrder = getSearchParamItem('sortOrder')

    // apply initial filters and sort
    setFilters({ date, name, title, field });
    setSort({ by: sortBy, order: sortOrder });
  }, [rows]);

  // filters / sort / rows change hook
  useEffect(() => {
    const { name, title, date, field } = filters;
    const { by, order } = sort;
    let url = new URL(window.location.href);
    url.searchParams.set('name', name ? name : '');
    url.searchParams.set('title', title ? title : '');
    url.searchParams.set('field', field ? field : '');
    url.searchParams.set('date', date ? date : '');
    url.searchParams.set('sortBy', by ? by : '');
    url.searchParams.set('sortOrder', order ? order : '');
    window.history.replaceState(null, null, url);

    // now filter and sort rows
    const result = sortRows(filterRows(rows, filters), by, order);
    
    // save result in state
    setTableRows(result);
  }, [filters, sort, rows]);

  // on sort change
  const onSortChange = (values) => {
    setSort(values)
  }

  // filter change handler
  const onFilterChange = (filterName, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [filterName]: value,
    }));
  };
  
  // clear all filters
  const clearFilters = () => {
    setFilters({
      name: '',
      date: '',
      field: '',
      title: '',
    });
  }

  return (
    <>
      <TableFilters clearFilters={clearFilters}>
        <TableFilter 
          name='name' 
          placeholder='نام تغییر دهنده'
          value={filters.name}
          onChange={(value) => onFilterChange('name', value)}
        />
        <TableFilter
          type="date"
          name='date'
          placeholder='تاریخ'
          value={filters.date}
          onChange={(value) => onFilterChange('date', value)}
        />
        <TableFilter
          name='title'
          placeholder='نام آگهی'
          value={filters.title}
          onChange={(value) => onFilterChange('title', value)}
        />
        <TableFilter
          name='field'
          placeholder='فیلد'
          value={filters.field}
          onChange={(value) => onFilterChange('field', value)}
        />
      </TableFilters>
      <TableContainer>
        <table className="Table">
          <TableHead columns={columns} sort={sort} onSortChange={onSortChange} />
          <TableBody rows={tableRows} />
        </table>
      </TableContainer>
    </>
  );
};

DataTable.propTypes = {
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

export default DataTable;