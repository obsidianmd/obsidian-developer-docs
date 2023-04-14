Decorations let you control how to draw or style content in [[Editor extensions|editor extensions]]. If you intend to change the look and feel by adding, replacing, or styling elements in the editor, you most likely need to use decorations.

By the end of this page, you'll be able to:

- Understand how to use decorations to change the editor appearance.
- Understand the difference between providing decoration using state fields and view plugins.

> [!note]
> This page aims to distill the official CodeMirror 6 documentation for Obsidian plugin developers. For more detailed information on state fields, refer to [Decorating the Document](https://codemirror.net/docs/guide/#decorating-the-document).

## Prerequisites

- Basic understanding of [[State fields]].
- Basic understanding of [[View plugins]].

## Overview

Without decorations, the document would render as plain text. Not very interesting at all. Using decorations, you can change how to display the document, for example by highlighting text or adding custom HTML elements.

You can use the following types of decorations:

- [Mark decorations](https://codemirror.net/docs/ref/#view.Decoration%5Emark) style existing elements.
- [Widget decorations](https://codemirror.net/docs/ref/#view.Decoration%5Ewidget) insert elements in the document.
- [Replace decorations](https://codemirror.net/docs/ref/#view.Decoration%5Ereplace) hide or replace part of the document with another element.
- [Line decorations](https://codemirror.net/docs/ref/#view.Decoration%5Eline) add styling to the lines, rather than the document itself.

To use decorations, you need to create them inside an editor extension and have the extension _provide_ them to the editor. You can provide decorations to the editor in two ways, either _directly_ using [[State fields|state fields]] or _indirectly_ using [[View plugins|view plugins]].

## Should I use a view plugin or a state field?

Both view plugins and state fields can provide decorations to the editor, but they have some differences.

- Use a view plugin if you can determine the decoration based on what's inside the [[Viewport]].
- Use a state field if you need to manage decorations outside of the viewport.
- Use a state field if you want to make changes that could change the content of the viewport, for example by adding line breaks.

If you can implement your extension using either approach, then the view plugin generally results in better performance. For example, imagine that you want to implement an editor extension that checks the spelling of a document.

One way would be to pass the entire document to an external spell checker which then returns a list of spelling errors. In this case, you'd need to map each error to a decoration and use a state field to manage decorations regardless of what's in the viewport at the moment.

Another way would be to only spellcheck what's visible in the viewport. The extension would need to continuously run a spell check as the user scrolls through the document, but you'd be able to spell check documents with millions of lines of text.

![State field vs. view plugin](decorations.svg)

## Providing decorations

Imagine that you want to build an editor extension that replaces the bullet list item with an emoji. You can accomplish this with either a view plugin or a state field, with some differences.  In this section, you'll see how to implement it with both types of extensions.

Both implementations share the same core logic:

1. Use [syntaxTree](https://codemirror.net/docs/ref/#language.syntaxTree) to find list items.
2. For every list item, replace leading hyphens, `-`, with a _widget_.

### Widgets

Widgets are custom HTML elements that you can add to the editor. You can either insert a widget at a specific position in the document, or replace a piece of content with a widget.

The following example defines a widget that returns an HTML element, `<span>👉</span>`. You'll use this widget later on.

```ts
import { EditorView, WidgetType } from "@codemirror/view";

export class EmojiWidget extends WidgetType {
  toDOM(view: EditorView): HTMLElement {
    const div = document.createElement("span");

    div.innerText = "👉";

    return div;
  }
}
```

To replace a range of content in your document with the emoji widget, use the [replace decoration](https://codemirror.net/docs/ref/#view.Decoration%5Ereplace).

```ts
const decoration = Decoration.replace({
  widget: new EmojiWidget()
});
```

### State fields

To provide decorations from a state field:

1. [[State fields#Defining a state field|Define a state field]] with a `DecorationSet` type.
2. Add the `provide` property to the state field.

   ```ts
   provide(field: StateField<DecorationSet>): Extension {
     return EditorView.decorations.from(field);
   },
   ```

```ts
import { syntaxTree } from "@codemirror/language";
import {
  Extension,
  RangeSetBuilder,
  StateField,
  Transaction,
} from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  WidgetType,
} from "@codemirror/view";
import { EmojiWidget } from "emoji";

export const emojiListField = StateField.define<DecorationSet>({
  create(state): DecorationSet {
    return Decoration.none;
  },
  update(oldState: DecorationSet, transaction: Transaction): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();

    syntaxTree(transaction.state).iterate({
      enter(node) {
        if (node.type.name.startsWith("list")) {
          // Position of the '-' or the '*'.
          const listCharFrom = node.from - 2;

          builder.add(
            listCharFrom,
            listCharFrom + 1,
            Decoration.replace({
              widget: new EmojiWidget(),
            })
          );
        }
      },
    });

    return builder.finish();
  },
  provide(field: StateField<DecorationSet>): Extension {
    return EditorView.decorations.from(field);
  },
});
```

### View plugins

To manage your decorations using a view plugin:

1. [[View plugins#Creating a view plugin|Create a view plugin]].
2. Add a `DecorationSet` member property to your plugin.
3. Initialize the decorations in the `constructor()`.
4. Rebuild decorations in `update()`.

Not all updates are reasons to rebuild your decorations. The following example only rebuilds decorations whenever the underlying document or the viewport changes.

```ts
import { syntaxTree } from "@codemirror/language";
import { RangeSetBuilder } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  PluginSpec,
  PluginValue,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@codemirror/view";
import { EmojiWidget } from "emoji";

class EmojiListPlugin implements PluginValue {
  decorations: DecorationSet;

  constructor(view: EditorView) {
    this.decorations = this.buildDecorations(view);
  }

  update(update: ViewUpdate) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.buildDecorations(update.view);
    }
  }

  destroy() {}

  buildDecorations(view: EditorView): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();

    for (let { from, to } of view.visibleRanges) {
      syntaxTree(view.state).iterate({
        from,
        to,
        enter(node) {
          if (node.type.name.startsWith("list")) {
            // Position of the '-' or the '*'.
            const listCharFrom = node.from - 2;

            builder.add(
              listCharFrom,
              listCharFrom + 1,
              Decoration.replace({
                widget: new EmojiWidget(),
              })
            );
          }
        },
      });
    }

    return builder.finish();
  }
}

const pluginSpec: PluginSpec<EmojiListPlugin> = {
  decorations: (value: EmojiListPlugin) => value.decorations,
};

export const emojiListPlugin = ViewPlugin.fromClass(
  EmojiListPlugin,
  pluginSpec
);
```

`buildDecorations()` is a helper method that builds a complete set of decorations based on the editor view.

Notice the second argument to the `ViewPlugin.fromClass()` function. The `decorations` property in the `PluginSpec` specifies how the view plugin provides the decorations to the editor.

Since the view plugin knows what's visible to the user, you can use `view.visibleRanges` to limit what parts of the syntax tree to visit.
