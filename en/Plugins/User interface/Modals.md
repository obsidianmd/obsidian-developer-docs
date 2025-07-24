Modals display information and accept user input. To create a modal, create a class that extends [[Reference/TypeScript API/Modal|Modal]]:

```ts
import { App, Modal } from 'obsidian';

export class ExampleModal extends Modal {
  constructor(app: App) {
    super(app);
	this.setContent('Look at me, I\'m a modal! 👀')
  }
}
```

To open a modal, create a new instance of `ExampleModal` and call [[Reference/TypeScript API/Modal/open|open()]] on it:

```ts
import { Plugin } from 'obsidian';
import { ExampleModal } from './modal';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: 'display-modal',
      name: 'Display modal',
      callback: () => {
        new ExampleModal(this.app).open();
      },
    });
  }
}
```

## Accept user input

Our modal in the previous example only displayed some information. Let's look at a slightly more complex example that also handles user input.

![[modal-input.png]]

```ts
import { App, Modal, Setting } from 'obsidian';

export class ExampleModal extends Modal {
  constructor(app: App, onSubmit: (result: string) => void) {
    super(app);
	this.setTitle('What\'s your name?');

	let name = '';
    new Setting(this.contentEl)
      .setName('Name')
      .addText((text) =>
        text.onChange((value) => {
          name = value;
        }));

    new Setting(this.contentEl)
      .addButton((btn) =>
        btn
          .setButtonText('Submit')
          .setCta()
          .onClick(() => {
            this.close();
            onSubmit(name);
          }));
  }
}
```

The result is passed into the `onSubmit` callback when the user clicks **Submit**:

```ts
new ExampleModal(this.app, (result) => {
  new Notice(`Hello, ${result}!`);
}).open();
```

## Select from list of suggestions

[[SuggestModal|SuggestModal]] is a special modal that lets you display a list of suggestions to the user.

![[suggest-modal.gif]]

```ts
import { App, Notice, SuggestModal } from 'obsidian';

interface Book {
  title: string;
  author: string;
}

const ALL_BOOKS = [
  {
    title: 'How to Take Smart Notes',
    author: 'Sönke Ahrens',
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
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
    el.createEl('div', { text: book.title });
    el.createEl('small', { text: book.author });
  }

  // Perform action on the selected suggestion.
  onChooseSuggestion(book: Book, evt: MouseEvent | KeyboardEvent) {
    new Notice(`Selected ${book.title}`);
  }
}
```

### Approximate string matching results

In addition to `SuggestModal`, the Obsidian API provides an even more specialized type of modal for suggestions: the [[FuzzySuggestModal|FuzzySuggestModal]], which gets you [fuzzy string search](https://en.wikipedia.org/wiki/Approximate_string_matching) out-of-the-box.

![[fuzzy-suggestion-modal.png]]

```ts
import {FuzzySuggestModal, Notice} from "obsidian";

export class ExampleSuggestModal extends FuzzySuggestModal<Book> {
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

### Custom rendering of fuzzy search results

For a more custom UI you implement the [[Reference/TypeScript API/fuzzysuggestmodal/renderSuggestion|renderSuggestion]] function, like in the earlier example.
The [[renderResults]] method is responsible for rendering the different strings while highlighting the matched parts.

![[fuzzy-suggestion-custom-modal.png]]


```ts
import {FuzzyMatch, FuzzySuggestModal, Notice, renderResults} from "obsidian";

export class ExampleSuggestModal extends FuzzySuggestModal<Book> {  
  
    //return a string representation, so there is something to search  
    getItemText(item: Book): string {  
       return item.title + " " + item.author;  
    }  
  
    getItems(): Book[] {  
       return ALL_BOOKS;  
    }  
  
    renderSuggestion(match: FuzzyMatch<Book>, el: HTMLElement) {  
       const titleEl = el.createDiv();  
       renderResults(titleEl, match.item.title, match.match);  
  
       // Only render the matches in the author name.  
       const authorEl = el.createEl('small');  
       const offset = -(match.item.title.length + 1);  
       renderResults(authorEl, match.item.author, match.match, offset);  
    }  
  
    onChooseItem(book: Book, evt: MouseEvent | KeyboardEvent): void {  
       new Notice(`Selected ${book.title}`);  
    }  
  
}
```