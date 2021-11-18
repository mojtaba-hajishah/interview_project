export class Node {
  constructor(
    value = null,
    id = null,
    left = null,
    right = null,
    children = []
  ) {
    this.value = value;
    this.right = right;
    this.left = left;
    this.children = children;
    this.id = id;
  }

  toString() {
    return JSON.stringify(this);
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  find(value) {
    const search = new Date(value).setHours(0, 0, 0, 0);
    let output;
    let traverse = (node) => {
      if (node === null || node.value === search) {
        return (output = node);
      } else if (search < node.value) {
        traverse(node.left);
      } else {
        traverse(node.right);
      }
    };
    traverse(this.root);
    return output;
  }

  insert(value, item) {
    if (this.root === null) {
      this.root = new Node(value, item.id);
      this.root.children.push(item);
      return this;
    } else {
      let current = this.root;
      while (true) {
        if (value === current.value && item.id !== current.id) {
          current.children.push(item);
          return this;
        }

        if (value > current.value) {
          if (current.right === null) {
            current.right = new Node(value, item.id);
            current.right.children.push(item);
            return this;
          } else {
            current = current.right;
          }
        } else {
          if (current.left === null) {
            current.left = new Node(value, item.id);
            current.left.children.push(item);
            return this;
          } else {
            current = current.left;
          }
        }
      }
    }
  }
}