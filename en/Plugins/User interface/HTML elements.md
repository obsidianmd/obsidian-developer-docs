Several components in the Obsidian API, such as the [[Settings]], expose _container elements_:

```ts
import { App, PluginSettingTab } from "obsidian";

class ExampleSettingTab extends PluginSettingTab {
  plugin: ExamplePlugin;

  constructor(app: App, plugin: ExamplePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    // highlight-next-line
    let { containerEl } = this;

    // ...
  }
}
```

Container elements are `HTMLElement` objects that make it possible to create custom interfaces within Obsidian.

## Create HTML elements using `createEl()`

Every `HTMLElement`, including the container element, exposes a `createEl()` method that creates an `HTMLElement` under the original element.

For example, here's how you can add an `<h1>` heading element inside the container element:

```ts
containerEl.createEl("h1", { text: "Heading 1" });
```

`createEl()` returns a reference to the new element:

```ts
const book = containerEl.createEl("div");
book.createEl("div", { text: "How to Take Smart Notes" });
book.createEl("small", { text: "Sönke Ahrens" });
```

## Style your elements

You can add custom CSS styles to your plugin by adding a `styles.css` file in the plugin root directory. To add some styles for the previous book example:

```css title="styles.css"
.book {
  border: 1px solid var(--background-modifier-border);
  padding: 10px;
}

.book__title {
  font-weight: 600;
}

.book__author {
  color: var(--text-muted);
}
```

> [!tip]
> `--background-modifier-border` and `--text-muted` are [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) that are defined and used by Obsidian itself. If you use these variables for your styles, your plugin will look great even if the user has a different theme! 🌈

To make the HTML elements use the styles, set the `cls` property for the HTML element:

```ts
const book = containerEl.createEl("div", { cls: "book" });
book.createEl("div", { text: "How to Take Smart Notes", cls: "book__title" });
book.createEl("small", { text: "Sönke Ahrens", cls: "book__author" });
```

Now it looks much better! 🎉

![[styles.png]]

### Conditional styles

Use the `toggleClass` method if you want to change the style of an element based on the user's settings or other values:

```ts
element.toggleClass("danger", status === "error");
```
