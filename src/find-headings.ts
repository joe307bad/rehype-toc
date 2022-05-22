import { NormalizedOptions } from "./options";
import { isHeading } from "./type-guards";
import { Heading } from "./types";
const visit = require("unist-util-visit");

/**
 * Finds all HTML heading nodes (`<h1>` through `<h6>`)
 */
export function findHeadings(node: any, options: NormalizedOptions): Heading[] {
  let headingNodes: Heading[] = [];
  visit(node, (n) => {
    if (isHeading(n, options)) {
      headingNodes.push(n);
    }
  });
  return headingNodes;
}
