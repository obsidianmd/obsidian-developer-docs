---
permalink: plugins/guides/lifecycle-management
---

When developing a plugin, you will often create resources such as event listeners, DOM elements, intervals, and workers. While setting these up is straightforward, it is equally important to properly clean them up when your plugin is unloaded. Without proper cleanup, you'll create memory leaks, orphaned event handlers, and bugs that persists even after your plugin is unloaded.


## What you'll learn

After completing this guide, you'll be able to:

- Manage resource lifecycles in your plugin.
- Use the `Component` class to simplify cleanup and organization.
- Avoid common pitfalls that cause resource leaks.
- Understand how components and subcomponents interact in Obsidian.


## Overview

Imagine your plugin needs to respond to window resize events.
Here's a simple (but incorrect!) implementation:

```ts
// Bad: the listener is never removed!
class MyPlugin extends Plugin {
	onResize() {
		console.debug("Window resized!");
	}

	onload() {
		window.addEventListener("resize", this.onResize);
	}
}
```

This code works initially, but it introduces a problem: when users disable your plugin, the resize listener stays active! It will continue firing until Obsidian is restarted. In this simple example, the impact might be minor, but in a more complex plugin, this can quickly lead to errors and memory leaks.

A more responsible solution would be to manually remove the listener during `onunload`:

```ts
// Better: but more tedious and error-prone.
class MyPlugin extends Plugin {
	onResize() {
		console.debug("Window resized!");
	}

	onload() {
		window.addEventListener("resize", this.onResize);
	}

	onunload() {
		window.removeEventListener("resize", this.onResize);
	}
}
```

As your plugin grows in complexity, manually tracking every resource you instantiate can become unwieldy and error-prone. Obsidian's `Component` system provides a better solution.


## Automatic Resource Management with `Component`

The `Plugin` class (which extends `Component`), provides access to several helper methods that automatically clean up resources when your plugin unloads:


```ts
// Best: the listener is automatically cleaned up!
class MyPlugin extends Plugin {
	onResize() {
		console.debug("Window resized!");
	}

	onload() {
		this.registerDomEvent(window, "resize", this.onResize);
	}
}
```

That's it. When your plugin unloads, the resize listener is automatically removed, without you having to write any additional cleanup code.

Here are the main helper methods provided by `Component` for resource management:

### `registerEvent(eventRef)`

Registers an Obsidian `EventRef` listener (from `app.vault.on(...)`, `app.workspace.on(...)`, etc.) that's automatically detached on unload.

```ts
this.registerEvent(
	this.app.vault.on("modify", (file) => {
		console.debug("File modified:", file.path);
	})
);
```

### `registerInterval(id)`

Registers an interval created by `setInterval`, automatically cleared on unload.

```ts
const id = window.setInterval(() => {
	console.debug("Periodic task running...");
}, 1000);
this.registerInterval(id);
```

### `registerDomEvent(el, event, handler)`

Registers a DOM event listener, automatically removed on unload.

```ts
this.registerDomEvent(window, "resize", () => {
	console.debug("Window resized!");
});
```

These methods will ensure your resources are always properly released when your plugin or component unloads.


## Understanding The Lifecycle of Objects

Before adding any resource to your plugin, ask yourself:
> [!NOTE]
> **“Who owns this resource, and how long should it live?”**

Some resources are naturally tied to the lifecycle of its parent, while some will persist long after its parent is gone.

Consider the following two examples:

```ts
class MyView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		const button = this.containerEl.appendChild(
			createEl("button", { text: "Click me!" })
		);
		// Good: the listener lives and dies with the button element.
		button.addEventListener("click", onButtonClick);
	}
}

class MyModal extends Modal {
	onKeyDown() {
		console.debug("Key pressed!");
	}

	onOpen() {
		// Bad: listener outlives the modal!
		window.addEventListener("keydown", this.onKeyDown);
	}
}
```

Why is the button listener acceptable, while the window listener is problematic?

The button listener is scoped to an element inside the View. Whenever the view closes and is removed from the DOM, the button disappears, and the listener is garbage collected alongside it.

The `window` listener is attached to the global `window` object, which persists indefinitely. If you don't explicitly remove the listener in `onClose` or `onunload`, it will keep firing forever!

Here's the corrected modal:

```ts
class MyModal extends Modal {
	onKeyDown() {
		console.debug("Key pressed!");
	}
	
	onOpen() {
		window.addEventListener("keydown", this.onKeyDown);
	}

	onClose() {
		window.removeEventListener("keydown", this.onKeyDown);
	}
}
```


## Resources That Need Explicit Cleanup

A good rule of thumb:
> [!NOTE]
> **Any resource created during `onload` (or later) should be cleaned up in `onunload`.**

This applies to various types of resources, including but not limited to:
- **Global event listeners:** attached to `window`, `document`, or any other long-lived object.
- **Obsidian event listeners:** created via `app.vault.on(...)`, `app.workspace.on(...)`, etc.
- **Intervals and timeouts:** created via `setInterval` or `setTimeout`.
- **External connections:** web workers, network connections, WebSocket connections.
- **Third-party libraries**: Anything that requires explicit disposal (e.g. databases, charting libraries, ...)
- **Heavy memory allocations:** large data structures, WASM instances, etc.


## The Component Hierarchy Model

The `Component` class is central to how Obsidian manages resources.
Every `Component` can:

- Register resources for automatic cleanup (using `registerEvent`, `registerInterval`, etc.)
- Contain child components
- Be nested within a parent component

When a parent component unloads, all its children are automatically unloaded as well.
This creates a natural hierarchy where resources are cleaned up in the correct order, and ownership is clear.

### Component Lifecycle

Each component goes through the following lifecycle stages:

- `onload()`
  - The parent component loads and this component was added as a child
  - The component is explicitly loaded (via `component.load()`)
  - The component is added to an already-loaded parent (via `parent.addChild(component)`)
- `onunload()`: 
  - The parent component unloads
  - The component is explicitly unloaded (via `component.unload()`)
  - The component is removed from its parent (via `parent.removeChild(component)`)

This hierarchy ensures proper teardown: children are created _after_ their parents, and destroyed _before_ their parents, preventing orphaned resources and memory leaks.


## Passing Components to Other APIs

Some APIs in Obsidian require a `Component` parameter to manage the lifecycle of whatever they create.
The most common example is the `MarkdownRenderer.render` method:

```ts
MarkdownRenderer.render(app, "## Some Markdown", containerEl, "", COMPONENT);
```

The `COMPONENT` parameter tells the `MarkdownRenderer` which component 'owns' the rendering context. When the parent component unloads, the renderer cleans up automatically.

### Common Pitfall: Orphaned Components

A frequent mistake is creating a `Component`, solely to pass it to an API, without ever unloading it.

```ts
import { Component, ItemView, MarkdownRenderer } from 'obsidian';

class MyView extends ItemView {
	onload() {		
		// Bad: tempComponent is never unloaded!
		const tempComponent = new Component();
		MarkdownRenderer.render(this.app, "## Some Markdown", this.containerEl, "", tempComponent);
		tempComponent.load();
	}
}
```

Since the `tempComponent` is never unloaded, the MarkdownRenderer will never clean up its resources. It becomes a memory leak.

### Solution: Add or use an existing component

Instead, you should pass a component that has a clearly defined lifecycle, one that will be loaded and unloaded properly. Since _every_ view is a `Component`, we can simply pass the `View` instance itself via `this`:

```ts
import { ItemView, MarkdownRenderer } from 'obsidian';

class MyView extends ItemView {
	onload() {		
		// Good: the view itself (`this`) manages the renderer's lifecycle.
		MarkdownRenderer.render(this.app, "## Some Markdown", this.containerEl, "", this);
	}
}
```

Now, when the view closes, the renderer cleans up automatically.


## Creating Your Own Components

You can also create your own reusable components by extending the `Component` class.
This is particularly useful when you have some logical unit (such as a widget or view) that manages its own state or resources.

```ts
import { Component, MarkdownRenderer } from "obsidian";
import SomeLibrary from "some-library";

class MyWidget extends Component {
	private widget: HTMLElement;
	private lib: SomeLibrary;

	constructor(private app: App) {
		super();
		this.widget = createDiv({ cls: "my-widget" });
	}

	onload() {
		// Render markdown content
		MarkdownRenderer.render(this.app, "## Some Markdown", this.widget, "", this);
		document.body.appendChild(this.widget);

		// Initialize some third-party library
		this.lib = new SomeLibrary();
		this.lib.initialize();

		// Register an event listener
		this.registerDomEvent(window, "resize", () => {
			this.lib.resize(window.innerWidth, window.innerHeight);
		});
	}
	
	doSomething() {
		this.lib.doSomething();
	}

	onunload() {
		// Removes the widget from the DOM and cleans up the library
		this.widget.remove();
		this.lib.destroy();
	}
}
```

This widget fully encapsulates its lifecycle. Everything it creates during `onload`, is eventually cleaned up by `onunload`.

Once you have created a custom component, you can add an instance (or multiple!) of it to your plugin (or any another component), making it part of the hierarchy:

```ts
class MyPlugin extends Plugin {
	private widget: MyWidget;

	constructor(app: App, manifest: PLuginManifest) {
		super();

		// Creates the widget component as a child, but it is not initialized yet!
		// The widget will be loaded once the plugin is fully loaded.
		this.widget = this.addChild(new MyWidget(this.app));
	}
	
	onload() {
		// Use the widget as needed.
		this.widget.doSomething();
	}
	
	onunload() {
		// The widget automatically unloads when the plugin unloads, no need to do anything here!
	}
	
	removeWidget() {
		// You can also manually remove/unload the widget.
		this.removeChild(this.widget);
	}
}
```

### Componentized Modal Example

You can also apply the component pattern to the modal example we saw earlier for better resource management:

```ts
class MyModal extends Modal {
	private component: Component;

	public constructor(app: App) {
		super(app);
		this.component = new Component();
		this.component.load();
	}

	onOpen() {
		// Register the keyboard event on the component
		this.component.registerDomEvent(window, "keydown", (evt) => {
			console.debug("Key pressed:", evt.key);
		});
	}

	onClose() {
		// Manually unload the component, which removes the listener
		this.removeChild(this.component);
	}
}
```


## Summary

- Use the `Component` class to manage and clean up resources.
- Register intervals, events, and DOM listeners through helper methods (`registerEvent`, `registerInterval`, `registerDomEvent`).
- Do not pass orphaned `Component` to APIs like `MarkdownRenderer.render`!
- Organize your plugin into smaller `Component` subclasses to simplify ownership.
- Remember: if you create a resource, make sure it will be cleaned up by `onunload`.
