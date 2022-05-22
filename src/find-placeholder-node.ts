import { Parent, } from "hast";
const visit = require("unist-util-visit");

/**
 * Returns the parent Parent node of the placeholder Text node (aka the `target` node).
 * The second node returned is the ancestor of the placeholder Text node (aka the `parent` node).
 */
export function findPlaceholderNode(root: Parent, placeholder: string): any {
  const node = findText(root, placeholder);

  return node;
}

function findText(node: any, placeholder: string): any[] {
  const placeholderNodes = [];
  visit(node, (n, i, parent) => {
    if (n.value === placeholder) {
      placeholderNodes.push(parent);
    }
  });
  return placeholderNodes;
}
