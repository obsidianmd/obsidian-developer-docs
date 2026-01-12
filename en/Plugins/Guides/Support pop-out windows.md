---
aliases:
  - Plugins/Guides/Supporting Pop-Out Windows
permalink: /plugins/guides/pop-out-windows
---
With the release of [Obsidian v0.15.0](https://obsidian.md/changelog/2022-06-14-desktop-v0.15.0/), the pop-out windows feature was added to the desktop version of Obsidian. 

For most plugins, this feature should work out-of-the-box. However, some things work differently when your plugin renders things in pop-out windows.

Most importantly, pop-out windows come with a complete different set of globals. Each pop-out window introduces its own `Window` object, `Document` object, and fresh copies of all global constructors (like `HTMLElement` and `MouseEvent`).

This means that some of the things you previously had assumed to be global and use only _a single_ definition, will now only work in the main window. Here are some examples:

```ts
let myElement: HTMLElement = ...;

// This will always append to the main window
document.body.appendChild(myElement);

// This will actually be false if element is in a pop-out window
if (myElement instanceof HTMLElement) {

}

element.on('click', '.my-css-class', (event) => {
    // This will be false if the event is triggered in a pop-out window
    if (event instanceof MouseEvent) {

    }
}
```

The Obsidian API includes various helper function and accessors to better support pop-out windows:

- A global `activeWindow` and `activeDocument` variable, which always points to the current focused window and its document. 
- An `element.win` and `element.doc` getter, which respectively point to the `Window` and `Document` objects that the element belongs to.
- A function for performing cross-window compatible `instanceof` checks. Use `element.instanceOf(HTMLElement)` and `event.instanceOf(MouseEvent)`, instead of `element instanceof HTMLElement` and `event instanceof MouseEvent`.
- `HTMLElement.onWindowMigrated(callback)` which hooks a callback on the element for when it is inserted into a different window than it originally was in. This can be used for complex renderers like canvases to re-initialize the rendering context.

Using these APIs, the previous example would look like this:

```ts
let myElement: HTMLElement = ...;

// Bad: myElement would be added to the currently focused document, which is not necessarily the one you want
activeDocument.body.appendChild(myElement);
// Good: This will append myElement to the same window as someElement
someElement.doc.body.appendChild(myElement);

// This will work correctly in pop-out windows
if (myElement.instanceOf(HTMLElement)) {

}

element.on('click', '.my-css-class', (event) => {
    // This will work correctly in pop-out windows
    if (event.instanceOf(MouseEvent)) {

    }
}
```
