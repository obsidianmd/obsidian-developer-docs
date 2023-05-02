Once you've built your editor extension, you might want to communicate with it from outside the editor. For example, through a [[Commands|command]], or a [[Ribbon actions|ribbon action]].

You can access the CodeMirror 6 editor from a [[MarkdownView|MarkdownView]]. However, since the Obsidian API doesn't actually expose the editor, you need to tell TypeScript to trust that it's there, using `@ts-expect-error`.

```ts
import { EditorView } from "@codemirror/view";

// @ts-expect-error, not typed
const editorView = view.editor.cm as EditorView;
```

## View plugin

You can access the [[View plugins|view plugin]] instance from the `EditorView.plugin()` method.

```ts
this.addCommand({
	id: "example-editor-command",
	name: "Example editor command",
	editorCallback: (editor, view) => {
		// @ts-expect-error, not typed
		const editorView = view.editor.cm as EditorView;

		const plugin = editorView.plugin(examplePlugin);

		if (plugin) {
			plugin.addPointerToSelection(editorView);
		}
	},
});
```

## State field

You can dispatch changes and [[State fields#Dispatching state effects|dispatch state effects]] directly on the editor view.

```ts
this.addCommand({
	id: "example-editor-command",
	name: "Example editor command",
	editorCallback: (editor, view) => {
		// @ts-expect-error, not typed
		const editorView = view.editor.cm as EditorView;

		editorView.dispatch({
			effects: [
				// ...
			],
		});
	},
});
```

