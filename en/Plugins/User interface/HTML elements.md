---
description: Create and style plugin HTML elements, scope DOM queries, and handle events without interfering with other plugins.
---

Several components in the Obsidian API, such as the [[Settings]], expose _container elements_:

```ts
import { App, PluginSettingTab } from 'obsidian';

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
containerEl.createEl('h1', { text: 'Heading 1' });
```

`createEl()` returns a reference to the new element:

```ts
const book = containerEl.createEl('div');
book.createEl('div', { text: 'How to Take Smart Notes' });
book.createEl('small', { text: 'Sönke Ahrens' });
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
const book = containerEl.createEl('div', { cls: 'book' });
book.createEl('div', { text: 'How to Take Smart Notes', cls: 'book__title' });
book.createEl('small', { text: 'Sönke Ahrens', cls: 'book__author' });
```

Now it looks much better! 🎉

![[styles.png]]

### Conditional styles

Use the `toggleClass` method if you want to change the style of an element based on the user's settings or other values:

```ts
element.toggleClass('danger', status === 'error');
```

## Scope DOM queries to your interface

Keep references to the elements you create. If you need to find an element later, query inside the container your plugin owns, rather than searching the whole document. A view can be open more than once, and each instance needs its own elements.

```ts
const searchEl = containerEl.createEl('input', {
  type: 'search',
  cls: 'example-plugin-search',
});

searchEl.focus();
```

Avoid using document-wide IDs to find plugin controls. Two instances of the same view can create duplicate IDs in one document, and the global `document` doesn't search pop-out windows. If you need an ID for accessibility, make it unique for each instance and keep the element reference for later access.

For operations that need a document or window, use `el.doc` and `el.win`. For cross-window type checks, use `el.instanceOf(HTMLElement)` instead of `el instanceof HTMLElement`. See [[Support pop-out windows]].

## Cooperate with other event handlers

Attach event handlers to your own controls or container. For plugin commands, use [[Commands]] instead of installing global `keydown` handlers on `document` or `window`. Global handlers can interfere with typing, Obsidian shortcuts, and other plugins, and a listener on the main document doesn't receive events from pop-out windows.

When replacing an event's default behavior, check `event.defaultPrevented` first and return if another handler already handled it. Call `event.preventDefault()` only when your handler takes responsibility for the action. Leave unrelated events unchanged.

`preventDefault()` cancels the default action while allowing other listeners to receive the event. `stopPropagation()` and `stopImmediatePropagation()` control event delivery; they don't cancel the default action and can prevent Obsidian or other plugins from receiving the event. Avoid using them to claim an event. See [Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) for the browser behavior.

For example, the workspace's [[Workspace/on('editor-paste')|editor-paste]] and [[Workspace/on('editor-drop')|editor-drop]] events use `defaultPrevented` to coordinate handlers. This plugin replaces pasted text only when it starts with `note:`:

```ts
import { Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  onload(): void {
    this.registerEvent(this.app.workspace.on('editor-paste', (event, editor) => {
      if (event.defaultPrevented) return;

      const text = event.clipboardData?.getData('text/plain');
      if (!text?.startsWith('note:')) return;

      event.preventDefault();
      editor.replaceSelection(text.slice('note:'.length));
    }));
  }
}
```

Make the decision and call `preventDefault()` synchronously, before any `await`. An asynchronous callback doesn't delay the event's default action. For DOM listeners that need lifecycle cleanup, use [[Component/registerDomEvent|registerDomEvent()]] so they are removed when the component unloads.
