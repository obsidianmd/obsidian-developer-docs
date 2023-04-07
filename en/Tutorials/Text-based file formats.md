Obsidian has built-in support for Markdown files and other media types, such as images and PDFs. As a plugin developer, you can extend Obsidian to support other file formats. In this tutorial, you'll build a plugin for reading and editing CSV files in Obsidian.

By the end of this tutorial, you'll be able to:

- Use the [[obsidian.textfileview|TextFileView]] to display and edit text-based file formats.

## Prerequisites

- [[Build a plugin]].
- Understand how to create basic [[HTML elements]].

## Step 1 — Register a `TextFileView`

[[obsidian.textfileview|TextFileView]] is a [[Views|custom view]] for reading and writing text-based files from your plugin. In this step, you'll extend the TextFileView and tell Obsidian to use it when the user opens a CSV file.

1. Create a new file `view.ts` with the following content:

  ```ts title="view.ts"
  import { TextFileView } from "obsidian";

  export const VIEW_TYPE_CSV = "csv-view";

  export class CSVView extends TextFileView {
    getViewData() {
      return this.data;
    }

    setViewData(data: string, clear: boolean) {
      this.data = data;
    }

    clear() {
      this.data = "";
    }

    getViewType() {
      return VIEW_TYPE_CSV;
    }
  }
  ```

1. In `main.ts`, register the view in the `onload` method.

   ```ts title="main.ts"
   import { CSVView, VIEW_TYPE_CSV } from "./view"
   ```

   ```ts title="main.ts"
   this.registerView(
     VIEW_TYPE_CSV,
       (leaf: WorkspaceLeaf) => new CSVView(leaf)
   );
   ```

1. Register the extensions you want the view to handle.

   ```ts title="main.ts"
   this.registerExtensions(["csv"], VIEW_TYPE_CSV);
   ```

1. Rebuild the plugin.
1. In the File Explorer, click the CSV file to open the view.

Unfortunately, the view doesn't display the data, because it doesn't know how to yet. To render the CSV data in the view, add the following lines in the `setViewData` method:

```ts title="view.ts" {4-5}
setViewData(data: string, clear: boolean) {
  this.data = data;

  this.contentEl.empty();
  this.contentEl.createDiv({ text: this.data });
}
```

You can now load CSV data and display it in Obsidian. The view prints the raw content of the CSV file inside a `div` element. Later in the tutorial, you'll render the data as an HTML table, but to do that you first need to parse the data into a more appropriate data structure.

## Step 2 — Encode and decode text data

The TextFileView provides a convenient property, `this.data`, where you can store the text content as a `string`. While it's good for simpler use cases, it's going to make it difficult to access individual cell values. In this step, you'll create a more useful in-memory representation of the table data.

The TextFileView provides a set of useful methods for working with text files:

- `getViewData()` returns the current state of the data. Obsidian uses this method to decode the view data into plaintext before writing it to a file.
- `setViewData()` updates the view whenever Obsidian reads new data from a file. Use this method to encode the text data into a format that makes it easier to work with.
- `clear()` resets the view whenever Obsidian unloads the file.

Since a table is a two-dimensional data structure, a better alternative is to use a two-dimensional string array, `string[][]`.

To replace `this.data` with a custom in-memory representation:

1. Add a `tableData` property of type `string[][]`.
1. Update `getViewData()` and `setViewData()` to parse the CSV data into `tableData`.
1. Update `clear()` to reset the view data.

Here's a basic implementation of parsing CSV data. For real-world use cases, consider using a more powerful parser, like [Papa Parse](https://www.papaparse.com/).

```ts title="view.ts"
export class CSVView extends TextFileView {
  tableData: string[][];

  getViewData() {
    return this.tableData.map((row) => row.join(",")).join("\n");
  }

  setViewData(data: string, clear: boolean) {
    this.tableData = data.split("\n").map((line) => line.split(","));
  }

  clear() {
    this.tableData = [];
  }

  // ...
}
```

Choosing a more appropriate data structure for our data will make it easier to work with the data.

> [!tip]
> The `clear` parameter in the `setViewData` is `true` whenever the user opens a different file. Use it to improve the performance of your view. For example, if you're caching data for a specific file and you want to clear the cache when loading a new file.

## Step 3 — Render the data

A benefit of creating a custom view for a file format is that you can display it in a more user-friendly way. In this step, you'll render the table data as an HTML `table` element.

You can add HTML elements to the view by appending them to the `contentEl` property on the TextFileView. For more information on how to create HTML elements, refer to [[HTML elements]].

```ts
this.contentEl.createEl("table");
```

TextFileView also exposes the `onOpen()` and `onClose()` hooks, which you can use to set up and tear down your view respectively.

1. Add a `tableEl` property of type `HTMLElement`.
1. Add the `onOpen()` method to create a `table` element.
1. Add the `onClose()` method to clean up any elements you've created.

```ts title="view.ts"
export class CSVView extends TextFileView {
  tableEl: HTMLElement;

  // ...

  async onOpen() {
    this.tableEl = this.contentEl.createEl("table");
  }

  async onClose() {
    this.contentEl.empty();
  }
}
```

`onOpen()` and `onClose()` only run when the user opens and closes the view. To update the view when the underlying file changes, you need to update the HTML element from the `setViewData()` method. By keeping a reference to the `tableEl`, you can update only the parts of the view that changes along with the data.

To update the view when the data changes on disk:

1. In the `CSVView` class, add a helper method that rerenders the table data in the `tableEl` element.

   ```ts title="view.ts"
   refresh() {
     // Remove previous data.
     this.tableEl.empty();

     const bodyEl = this.tableEl.createEl("tbody");

     this.tableData.forEach((row, i) => {
       const rowEl = bodyEl.createEl("tr");

       row.forEach((cell, j) => {
         rowEl.createEl("td", { text: cell });
       });
     });
   }
   ```

1. Call the `refresh()` helper method in `setViewData()`.

   ```ts title="view.ts" {4}
   setViewData(data: string, clear: boolean) {
     this.tableData = data.split("\n").map((line) => line.split(","));

     this.refresh();
   }
   ```

Your plugin can now appropriately display CSV data as a table. Much more user-friendly, wouldn't you say?

> [!tip]
> Depending on the Obsidian theme you're using, you may want to style the table. To add some basic CSS to your table, add the following to a file called `styles.css` in the plugin's root directory:
>
> ```css title="styles.css"
> table {
>   border-collapse: collapse;
> }
> 
> table,
> td {
>   border: 1px solid var(--background-modifier-border);
> }
> 
> td {
>   padding: 4px 8px;
> }
> ```

## Step 4 — Edit the data

Right now, the user can only read the content of the file. In this step, you'll add `input` elements for each table cell that let the user edit the CSV values and write them back to disk.

The `refresh()` helper from previous step creates a `td` element for each table cell. Right now, it adds the cell value as text inside the `td` element.

```ts
row.forEach((cell, j) => {
  rowEl.createEl("td", { text: cell });
});
```

To let the user edit the value, instead add an `input` element to the `td` element.

```ts
row.forEach((cell, j) => {
  rowEl
    .createEl("td")
    .createEl("input", { attr: { value: cell } });
});
```

The user can now edit the values in the table, but since the `input` doesn't actually update the table data, the changes don't persist when you close and reopen the view.

To save the changes, add an `oninput` event handler that updates `tableData` when the `input` value changes.

```ts
row.forEach((cell, j) => {
  const inputEl = rowEl
    .createEl("td")
    .createEl("input", { attr: { value: cell } });

  // highlight-start
  input.oninput = (ev) => {
    if (ev.currentTarget instanceof HTMLInputElement) {
      this.tableData[i][j] = ev.currentTarget.value;
      this.requestSave();
    }
  };
  // highlight-end
});
```

The event handler for the input updates the in-memory representation of the table and tells Obsidian to update it on disk, by calling `this.requestSave()`.

> [!tip]
> Remove the background and border of the `input` element for a more polished look.
> 
> ```css title="styles.css"
> input {
>   background: none;
>   border: none;
> }
> ```

## Next steps

In this tutorial, you've built a plugin that lets users display and edit CSV files in Obsidian. You can use the same steps to add support for other text-based file formats, such as [Org Mode](https://orgmode.org/) and [BibTex](http://www.bibtex.org/).

## Complete example

```ts title="view.ts"
import { TextFileView } from "obsidian";

export const VIEW_TYPE_CSV = "csv-view";

export class CSVView extends TextFileView {
  tableData: string[][];
  tableEl: HTMLElement;

  getViewData() {
    return this.tableData.map((row) => row.join(",")).join("\n");
  }

  // If clear is set, then it means we're opening a completely different file.
  setViewData(data: string, clear: boolean) {
    this.tableData = data.split("\n").map((line) => line.split(","));

    this.refresh();
  }

  refresh() {
    this.tableEl.empty();

    const tableBody = this.tableEl.createEl("tbody");

    this.tableData.forEach((row, i) => {
      const tableRow = tableBody.createEl("tr");

      row.forEach((cell, j) => {
        const input = tableRow
          .createEl("td")
          .createEl("input", { attr: { value: cell } });

        input.oninput = (ev) => {
          if (ev.currentTarget instanceof HTMLInputElement) {
            this.tableData[i][j] = ev.currentTarget.value;
            this.requestSave();
          }
        };
      });
    });
  }

  clear() {
    this.tableData = [];
  }

  getViewType() {
    return VIEW_TYPE_CSV;
  }

  async onOpen() {
    this.tableEl = this.contentEl.createEl("table");
  }

  async onClose() {
    this.contentEl.empty();
  }
}
```

```css title="styles.css"
table {
  border-collapse: collapse;
}

table,
td {
  border: 1px solid var(--background-modifier-border);
}

td {
  padding: 4px 8px;
}

input {
  background: none;
  border: none;
}
```
