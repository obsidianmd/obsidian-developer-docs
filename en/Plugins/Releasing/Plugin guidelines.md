This page lists common review comments plugin authors get when submitting their plugin.

For more information about general guidelines for developers, refer to [[Developer policies]].

## Resource management

### Clean up resources when plugin unloads

Any resources created by the plugin, such as event listeners, must be destroyed or released when the plugin unloads.

When possible, use methods like [[obsidian.component.registerevent|registerEvent()]] or [[obsidian.plugin_2.addcommand|addCommand()]] to automatically clean up resources when the plugin unloads.

```ts
export default class MyPlugin extends Plugin {
  onload() {
    this.registerEvent(this.app.vault.on("create", this.onCreate));
  }

  onCreate: (file: TAbstractFile) => {
    // ...
  }
}
```

> [!note]
> You don't need to clean up resources that are guaranteed to be removed when your plugin unloads. For example, if you register a `mouseenter` listener on a DOM element, the event listener will be garbage-collected when the element goes out of scope.

## Naming

### Rename placeholder class names

The sample plugin contains placeholder names for common classes, such as `MyPlugin`, `MyPluginSettings`, and `SampleSettingTab`. Rename these to reflect the name of your plugin.

## Manifest

### Only use `fundingUrl` to link to services for financial support

Use [[Manifest#fundingUrl|fundingUrl]] if you accept financial support for your plugin, using services like Buy Me A Coffee or GitHub Sponsors. If you don't accept donations, remove `fundingUrl` from your manifest.

## Node.js and Electron API

The Node.js and Electron APIs are only available in the desktop version of Obsidian. If your plugin uses any of these APIs, you need to set `isDesktopOnly` to `true` in the `manifest.json`. Otherwise, the plugin will fail to load on mobile devices.

For example, Node.js packages like `fs`, `crypto`, and `os`, are only available on desktop.

If possible, use alternative features that are available in the Web API. For example:

- [`SubtleCrypto`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) instead of [`crypto`](https://nodejs.org/api/crypto.html).
- `navigator.clipboard.readText()` and `navigator.clipboard.writeText()` to access clipboard contents.

## Commands

When you add a command in your plugin, use the appropriate callback type.

- Use `callback` if the command runs unconditionally.
- Use `checkCallback` if the command only runs under certain conditions.

If the command requires an open and active Markdown editor, use `editorCallback`, or the corresponding `editorCheckCallback`.

## Workspace

### Avoid accessing `Workspace.activeLeaf` directly

If you want to access the editor in the active view, use [[obsidian.workspace.getactiveviewoftype|getActiveViewOfType()]] instead.

```ts
const view = app.workspace.getActiveViewOfType(MarkdownView);

// getActiveViewOfType will return null if the active view is null, or if it's not a MarkdownView.
if (view) {
  // ...
}
```

### Avoid managing references to custom views

Managing references to custom view can cause memory leaks or unintended consequences.

**Don't** do this:

```ts
this.registerViewType(MY_VIEW_TYPE, () => this.view = new MyCustomView());
```

Do this instead:

```ts
this.registerViewType(MY_VIEW_TYPE, () => new MyCustomView());
```

To access the view from your plugin, use `Workspace.getActiveLeavesOfType()`:

```ts
for (let leaf of app.workspace.getActiveLeavesOfType(MY_VIEW_TYPE)) {
  let view = leaf.view;
  if (view instanceof MyCustomView) {
    // ...
  }
}
```

## Vault

### Prefer the Editor API instead of `Vault.modify`

If you want to edit an active note, use [[Editor]] instead of [[obsidian.vault.modify|Vault.modify()]].

Editor maintains information about the active note, such as cursor position, selection, and folded content. When you use [[obsidian.vault.modify|Vault.modify()]] to edit the note, all that information is lost, which leads to a poor experience for the user.

Editor is also more efficient when making small changes to parts of the note.

Only use [[obsidian.vault.modify|Vault.modify()]] if you're editing a file in the background.

### Prefer the Vault API over the Adapter API

Obsidian exposes two APIs for file operations: the Vault API (`app.vault`) and the Adapter API (`app.vault.adapter`).

While the file operations in the Adapter API are often more familiar to many developers, the Vault API has two main advantages over the adapter.

- **Performance:** The Vault API has a caching layer that can speed up file reads when the file is already known to Obsidian.
- **Safety:** The Vault API performs file operations serially to avoid any race conditions, for example when reading a file that is being written to at the same time.

### Avoid iterating all files to find a file by its path

This is inefficient, especially for large vaults. Use [[obsidian.vault.getabstractfilebypath|getAbstractFileByPath()]] instead.

**Don't** do this:

```ts
vault.getAllFiles().find(file => file.path === filePath)
```

Do this instead:

```ts
const filePath = 'folder/file.md';

const file = app.vault.getAbstractFileByPath(filePath);

// Check if it exists and is of the correct type
if (file instanceof TFile) {
  // file is automatically casted to TFile within this scope.
}
```

## Editor

### How to change or reconfigure your CM6 extensions

If you want to change or reconfigure an [[Editor extensions|editor extension]] after you've registered using [[obsidian.plugin_2.registereditorextension|registerEditorExtension()]], use [[obsidian.workspace.updateoptions|updateOptions()]] to update all editors.

```ts
class MyPlugin extends Plugin {
  private editorExtension: Extension[] = [];

  onload() {
    //...

    this.registerEditorExtension(this.editorExtension);
  }

  updateEditorExtension() {
    // Empty the array while keeping the same reference
    // (Don't create a new array here)
    this.editorExtension.length = 0;

    // Create new editor extension
    let myNewExtension = this.createEditorExtension();
    // Add it to the array
    this.editorExtension.push(myNewExtension);

    // Flush the changes to all editors
    this.app.workspace.updateOptions();
  }
}

```

## TypeScript

### Avoid `innerHTML`, `outerHTML` and `insertAdjacentHTML`

Building DOM elements from user-defined input, using `innerHTML`, `outerHTML` and `insertAdjacentHTML` can pose a security risk.

The following example builds a DOM element using a string that contains user input, `${name}`. `name` can contain other DOM elements, such as `<script>alert()</script>`, and can allow a potential attacker to execute arbitrary code on the user's computer.

```ts
function showName(name: string) {
  let containerElement = document.querySelector('.my-container');
  // DON'T DO THIS
  containerElement.innerHTML = `<div class="my-class"><b>Your name is: </b>${name}</div>`;
}
```

Instead, use the DOM API or the Obsidian helper functions, such as `createEl()`, `createDiv()` and `createSpan()` to build the DOM element programmatically. For more information, refer to [[HTML elements]].

### Prefer async/await over Promise

Recent versions of JavaScript and TypeScript support the `async` and `await` keywords to run code asynchronously, which allow for more readable code than using Promises.

**Don't** do this:

```ts
function test(): Promise<string | null> {
  return requestUrl('https://example.com')
    .then(res => res.text())
    .catch(e => {
      console.log(e);
      return null;
    });
}
```

Do this instead:

```ts
async function AsyncTest(): Promise<string | null> {
  try {
    let res = await requestUrl('https://example.com');
    let text = await r.text();
    return text;
  }
  catch (e) {
    console.log(e);
    return null;
  }
}
```

## Use `normalizePath()` to clean up user-defined paths

Use [[obsidian.normalizepath|normalizePath()]] whenever you accept user-defined paths to files or folders in the vault, or when you construct your own paths in the plugin code.

`normalizePath()` takes a path and scrubs it to be safe for the file system and for cross-platform use. This function:

- Cleans up the use of forward and backward slashes, such as replacing 1 or more of `\` or `/` with a single `/`.
- Removes leading and trailing forward and backward slashes.
- Replaces any non-breaking spaces, `\u00A0`, with a regular space.
- Runs the path through [String.prototype.normalize](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize).

```ts
import { normalizePath } from "obsidian";
const pathToPlugin = normalizePath(app.vault.configDir + "//plugins/my-plugin");
// pathToPlugin contains ".obsidian/plugins/my-plugin" not .obsidian//plugins/my-plugin
```
