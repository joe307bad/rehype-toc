import { Node, Root, Parent, Element, Text } from "hast";
import { NormalizedOptions } from "./options";
import { Heading, HeadingTagName } from "./types";

/**
 * Determines whether the given node is a Root node.
 */
export function isRoot(node: Node): node is Root {
  return node.type === "root";
}

/**
 * Determines whether the given node is an HTML Parent element.
 */
export function isParent(node: any): node is Parent {
  return !!node.children;
}

/**
 * Determines whether the given node is an HTML Element.
 */
export function isElement(node: any): node is Element {
  return node.type === "element" || node.type === "mdxJsxFlowElement";
}

/**
 * Determines whether the given node is an HTML heading node, according to the specified options
 */
export function isHeading(
  node: any,
  options: NormalizedOptions
): node is Heading {
  return (
    isElement(node) && options.headings.includes(node.tagName as HeadingTagName)
  );
}

/**
 * Determines whether the given node is an HTML Text node.
 */
export function isText(node: any): node is Text {
  return node.type === "text";
}
