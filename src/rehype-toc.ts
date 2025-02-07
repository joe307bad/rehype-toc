import { Node, Parent, Element } from "hast";
import { Processor, Transformer } from "unified";
import { createTOC } from "./create-toc";
import { customizationHooks } from "./customization-hooks";
import { findHeadings } from "./find-headings";
import { findMainNode } from "./find-main-node";
import { findPlaceholderNode } from "./find-placeholder-node";
import { insertTOC } from "./insert-toc";
import { NormalizedOptions, Options } from "./options";
import { isRoot } from "./type-guards";

/**
 * This is a Rehype plugin that adds a table of contents (TOC) that links to all
 * the `<h1>` - `<h6>` headings no the page.
 */
export function toc(this: Processor, opts?: Options): Transformer {
  let options = new NormalizedOptions(opts);

  return function transformer(root: Node): Node {
    if (!isRoot(root)) {
      throw new Error("`root` is not a Root hast node.");
    }

    let mainNode: Element | undefined;
    let mainParent: Parent | undefined;
    let placeholderNode: any;
    let placeholderParent: Parent | undefined;

    if (options.placeholder) {
      // Find the <target> element if option is given
      placeholderNode = findPlaceholderNode(root, options.placeholder)?.[0];

      if (!placeholderNode) {
        return root;
      }
    }

    // Find the <main> or <body> element
    [mainNode, mainParent] = findMainNode(root);

    // Find all heading elements
    let headings = findHeadings(root, options);

    // Create the table of contents
    let tocNode = createTOC(headings, options);

    // Allow the user to customize the table of contents before we add it to the page
    let node = customizationHooks(tocNode, options);

    if (node) {
      // Add the table of contents to the <main> element
      insertTOC(
        node,
        placeholderNode || mainNode,
        placeholderParent || mainParent,
        {
          ...options,
          replace: !!options.placeholder,
        }
      );
    }

    return root;
  };
}
