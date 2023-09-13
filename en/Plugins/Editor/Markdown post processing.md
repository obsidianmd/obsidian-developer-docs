If you want to change how a Markdown document is rendered in Reading view, you can add your own _Markdown post processor_. As indicated by the name, the post processor runs _after_ the Markdown has been processed into HTML. It lets you add, remove, or replace [[HTML elements]] to the rendered document.

The following example looks for any code block that contains a text between two colons, `:`, and replaces it with an appropriate emoji:

```ts
import { Plugin } from "obsidian";

const ALL_EMOJIS: Record<string, string> = {
  ":+1:": "👍",
  ":sunglasses:": "😎",
  ":smile:": "😄",
};

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.registerMarkdownPostProcessor((element, context) => {
      const codeblocks = element.findAll("code");

      for (let codeblock of codeblocks) {
        const text = codeblock.innerText.trim();
        if (text[0] === ":" && text[text.length - 1] === ":") {
          const emojiEl = codeblock.createSpan({
            text: ALL_EMOJIS[text] ?? text,
          });
          codeblock.replaceWith(emojiEl);
        }
      }
    });
  }
}
```

## Post-process Markdown code blocks

Did you know that you can create [Mermaid](https://mermaid-js.github.io/) diagrams in Obsidian by creating a `mermaid` code block with a text definition like this one?:

````md
```mermaid
flowchart LR
    Start --> Stop
```
````

If you change to Preview mode, the text in the code block becomes the following diagram:

```mermaid
flowchart LR
    Start --> Stop
```

If you want to add your own custom code blocks like the Mermaid one, you can use [[registerMarkdownCodeBlockProcessor|registerMarkdownCodeBlockProcessor()]]. The following example renders a code block with CSV data, as a table:

```ts
import { Plugin } from "obsidian";

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor("csv", (source, el, ctx) => {
      const rows = source.split("\n").filter((row) => row.length > 0);

      const table = el.createEl("table");
      const body = table.createEl("tbody");

      for (let i = 0; i < rows.length; i++) {
        const cols = rows[i].split(",");

        const row = body.createEl("tr");

        for (let j = 0; j < cols.length; j++) {
          row.createEl("td", { text: cols[j] });
        }
      }
    });
  }
}
```
