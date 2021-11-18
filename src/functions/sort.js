// sort function
const sort = (a, b, field, order) => {

  const fieldA = a[field];
  const fieldB = b[field];
  // if both integers
  if(typeof fieldA === 'number' && typeof fieldB === 'number') {
    return order === 'asc' ? fieldA - fieldB : fieldB - fieldA;
  }
  // else, compare as strings
  const fieldAString = `${fieldA}`.toString().toUpperCase();
  const fieldBString = `${fieldB}`.toString().toUpperCase();

  if (fieldAString < fieldBString) {
    return order === 'asc' ? -1 : 1;
  }
  if (fieldAString > fieldBString) {
    return order === 'asc' ? 1 : -1;
  }

  // equal
  return 0;
}

// sort table rows
export function sortRows(rows, field, order) {
  return [].concat(rows).sort((a,b) => {return sort(a,b,field, order)});
}
