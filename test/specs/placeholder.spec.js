"use strict";

const process = require("../utils/process");
const compare = require("../utils/compare");
const { expect } = require("chai");

describe("options.placeholder", () => {
  it("should insert the TOC at the placeholder TABLE_OF_CONTENTS", async () => {
    let results = await process(
      `
        <html>
          <body>
            <main>This is the content</main>
            <aside>TABLE_OF_CONTENTS</aside>
            <h1>Heading</h1>
          </body>
        </html>
      `,
      {
        placeholder: "TABLE_OF_CONTENTS",
      }
    );

    compare(
      results,
      `
        <html>
        <head>
</head>
<body>
<main>This is the content</main>
<aside>
<nav class="toc">
<ol class="toc-level toc-level-1">
<li class="toc-item toc-item-h1">
<a class="toc-link toc-link-h1" href="#">Heading</a>
 </li>
</ol>
</nav>
 </aside>
<h1>Heading</h1>
</body>
</html>
      `
    );
  });
});
