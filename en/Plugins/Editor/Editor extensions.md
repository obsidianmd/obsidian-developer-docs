---
aliases: editor extension
description: Learn when to use CodeMirror editor extensions and how to register them in an Obsidian plugin.
---

Editor extensions let you customize the experience of editing notes in Obsidian. This page explains what editor extensions are, and when to use them.

Obsidian uses CodeMirror 6 (CM6) to power the Markdown editor. Just like Obsidian, CM6 has plugins of its own, called _extensions_. In other words, an Obsidian _editor extension_ is the same thing as a _CodeMirror 6 extension_.

The API for building editor extensions is a bit unconventional and requires that you have a basic understanding of its architecture before you get started. This section aims to give you enough context and examples for you to get started. If you want to learn more about building editor extensions, refer to the [CodeMirror 6 documentation](https://codemirror.net/docs/).

## Do I need an editor extension?

Building editor extensions can be challenging, so before you start building one, consider whether you really need it.

- If you want to change how to convert Markdown to HTML in the Reading view, consider building a [[Markdown post processing|Markdown post processor]].
- If you want to change how the document looks and feels in Live Preview, you need to build an editor extension.

## Change the editor through its APIs

CodeMirror manages the editor's DOM from its internal state and only renders part of a large document at a time. Don't modify its managed elements directly or use DOM queries to read the full note. CodeMirror watches its content for changes: it reads text you write into a line back into the document as if the user had typed it, and it discards other changes, such as added classes or attributes, the next time it redraws the line.

To read or change note text, use Obsidian's [[Editor]] API. To customize the editor's appearance, use [[Decorations]], including widgets for custom HTML. Use [[View plugins]] to respond to editor updates, and CodeMirror keymaps or event handlers for interactions inside the editor. Register plugin commands through [[Commands]] rather than global keyboard listeners.

This restriction applies to DOM managed by CodeMirror. You can create and update the elements your own widgets render through the widget lifecycle. Reading view uses [[Markdown post processing|Markdown post processors]] instead of editor extensions. See the [CodeMirror DOM guide](https://codemirror.net/docs/guide/#dom) for more about how the editor manages its DOM.

## Registering editor extensions

CodeMirror 6 (CM6) is a powerful engine for editing code using web technologies. At its core, the editor itself has a minimal set of features. Any features you'd expect from a modern editor are available as _extensions_ that you can pick and choose. While Obsidian comes with many of these extensions out-of-the-box, you can also register your own.

To register an editor extension, use [[registerEditorExtension|registerEditorExtension()]] in the `onload` method of your Obsidian plugin:

```ts
onload() {
  this.registerEditorExtension([examplePlugin, exampleField]);
}
```

While CM6 supports several types of extensions, two of the most common ones are [[View plugins]] and [[State fields]].
<DocCardList items={useCurrentSidebarCategory().items}/>
