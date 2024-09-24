Modals display information and accept input from the user. To create a modal, create a class that extends [[Reference/TypeScript API/Modal|Modal]]:

```ts
import { App, Modal } from "obsidian";

export class ExampleModal extends Modal {
  constructor(app: App) {
    super(app);
	this.setContent("Look at me, I'm a modal! 👀")
  }
}
```

To open a modal, create a new instance of `ExampleModal` and call [[Reference/TypeScript API/Modal/open|open()]] on it:

```ts
import { Plugin } from "obsidian";
import { ExampleModal } from "./modal";

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "display-modal",
      name: "Display modal",
      callback: () => {
        new ExampleModal(this.app).open();
      },
    });
  }
}
```

## Accept user input

The modal in the previous example only displayed some text. Let's look at a little more complex example that handles input from the user.

![[modal-input.png]]

```ts
import { App, Modal, Setting } from "obsidian";

export class ExampleModal extends Modal {
  constructor(app: App, onSubmit: (result: string) => void) {
    super(app);
	this.setTitle("What's your name?");

	let name = '';
    new Setting(this.contentEl)
      .setName("Name")
      .addText((text) =>
        text.onChange((value) => {
          name = value;
        }));

    new Setting(this.contentEl)
      .addButton((btn) =>
        btn
          .setButtonText("Submit")
          .setCta()
          .onClick(() => {
            this.close();
            onSubmit(name);
          }));
  }
}
```

The result is returned in the `onSubmit` callback when the user clicks **Submit**:

```ts
new ExampleModal(this.app, (result) => {
  new Notice(`Hello, ${result}!`);
}).open();
```

## Select from list of suggestions

[[SuggestModal|SuggestModal]] is a special modal that lets you display a list of suggestions to the user.

![[suggest-modal.gif]]

```ts
import { App, Notice, SuggestModal } from "obsidian";

interface Book {
  title: string;
  author: string;
}

const ALL_BOOKS = [
  {
    title: "How to Take Smart Notes",
    author: "Sönke Ahrens",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
  },
];

export class ExampleModal extends SuggestModal<Book> {
  // Returns all available suggestions.
  getSuggestions(query: string): Book[] {
    return ALL_BOOKS.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Renders each suggestion item.
  renderSuggestion(book: Book, el: HTMLElement) {
    el.createEl("div", { text: book.title });
    el.createEl("small", { text: book.author });
  }

  // Perform action on the selected suggestion.
  onChooseSuggestion(book: Book, evt: MouseEvent | KeyboardEvent) {
    new Notice(`Selected ${book.title}`);
  }
}
```

In addition to `SuggestModal`, the Obsidian API provides an even more specialized type of modal for suggestions: the [[FuzzySuggestModal|FuzzySuggestModal]]. While it doesn't give you the same control of how each item is rendered, you get [fuzzy string search](https://en.wikipedia.org/wiki/Approximate_string_matching) out-of-the-box.

![[fuzzy-suggestion-modal.png]]

```ts
export class ExampleModal extends FuzzySuggestModal<Book> {
  getItems(): Book[] {
    return ALL_BOOKS;
  }

  getItemText(book: Book): string {
    return book.title;
  }

  onChooseItem(book: Book, evt: MouseEvent | KeyboardEvent) {
    new Notice(`Selected ${book.title}`);
  }
}
```
