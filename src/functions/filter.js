import { BinarySearchTree } from './binarySearchTree';

// create a bst
const bst = new BinarySearchTree();

// filter table rows
export function filterRows(rows, filters) {
  const {date, title, field, name} = filters;
  let result = rows;
  // first filter by date
  const match = bst.find(date);
  if (match && match.children) {
    result = match.children;
  }
  // then filter by other fields
  result = result.filter((item) => {
    return (
      item.name?.toLowerCase().startsWith(name.toLowerCase()) &&
      item.field?.toLowerCase().startsWith(field.toLowerCase()) &&
      item.title?.toLowerCase().startsWith(title.toLowerCase())
    )
  });

  return result;
}
