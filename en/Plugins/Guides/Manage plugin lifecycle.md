---
permalink: plugins/guides/lifecycle-management
---

When developing a plugin, you will often create resources such as event listeners, DOM elements, intervals or workers. While setting these up is often straightforward, it is equally important to properly clean them up when your plugin is unloaded. Neglecting this can lead to memory leaks, dangling event handlers, or unexpected behavior.


## What you'll learn

After completing this guide, you'll be able to:

- Manage the lifecycle of resources in your plugin.
- Use the `Component` class to simplify cleanup and organization.
- Avoid common pitfalls that lead to resource leaks or stale data.
- Understand how components and subcomponents interact in Obsidian.


## Overview

Imagine your plugin needs to respond to window resize events.
A simple (but incorrect implementation!) might look like this:

```ts
// Bad
class MyPlugin extends Plugin {
	onResize() {
		// ...
	}

	onload() {
		window.addEventListener("resize", this.onResize);
	}
}
```

This works, but it introduces a problem: when the user disabled your plugin, the resize listener remains active! Only when Obsidian is restarted will it be removed. While this might be a fairly innocuous example, in more complex scenarios, this can lead to errors and memory leaks.

A more responsible solution would be to manually remove the listener during `onunload`:

```ts
// Better
class MyPlugin extends Plugin {
	// ...
	onload() {
		window.addEventListener("resize", this.onResize);
	}

	onunload() {
		window.removeEventListener("resize", this.onResize);
	}
}
```

While this works, it quickly becomes repetitive and error-prone. Fortunately, Obsidian's `Component` system offers a better solution.


## Automatic Resource Management with `Component`

Inside the `Plugin` class, you have access to several helper methods for registering and automatically cleaning up resources when unloaded.


```ts
// Good
class MyPlugin extends Plugin {
	// ...
	onload() {
		this.registerDomEvent(window, "resize", onResize);
	}
}
```

The `registerDomEvent` call automatically removes the listener when your plugin unloads, so you don't have to track it manually. The same applies to other helper methods:

### `registerEvent(eventRef)`

Registers an Obsidian `EventRef` (from `app.vault.on(...)`, etc.).
The event will be automatically detached when unloaded.

```ts
this.registerEvent(this.app.vault.on("modify", onFileModify, this));
```

### `registerInterval(id)`

Registers an interval created by `setInterval`.
All registered intervals are automatically cleared on unload.

```ts
const id = window.setInterval(doSomethingPeriodically, 1000);
this.registerInterval(id);
```

### `registerDomEvent(el, event, handler)`

Registers a DOM event on an element or window.
Automatically removed on unload.

```ts
this.registerDomEvent(window, "resize", onResize);
```

These methods will ensure that any listener you create is always properly released when your plugin or component unloads.


## The Lifecycle of Objects


A good rule of thumb:
> [!NOTE]
> **Any resource created during `onload` (or later) should be cleaned up in `onunload`.**

This applies to various types of resources, including but not limited to:
- DOM event listeners
- Obsidian event listeners
- Intervals and timeouts
- Workers, network connections, or WASM instances
- Third-party libraries that need explicit disposal

Before adding any resource, you should ask yourself:
> [!NOTE]
> **“Who owns this, and how long should it live?”**

Consider the following scenario, you want to listen for clicks on a button inside a custom view, and keyboard inputs on the entire window.

```ts
class MyView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		const button = this.containerEl.appendChild(
			createEl("button", { text: "Click me!" })
		);
		// Good
		button.addEventListener("click", onButtonClick);
	}
}

class MyPlugin extends Plugin {
	onload() {
		// Bad
		window.addEventListener("keydown", onKeyDown);
	}
}
```


You might ask yourself: "_Why is the button listener fine, but the window listener is bad?_".
It comes down to the lifetime of the objects:

The button listener is fine, because when the view is closed, the button will also be removed from the DOM. The listener disappears with it.
The window listener, however, persists even after your plugin is disabled, so it must be explicitly cleaned up!


## Components and the Hierarchy Model

The `Component` class is central to how Obsidian manages resources.
Every `Component` can:

- Register cleanup tasks (using `registerEvent`, `registerInterval`, etc.)
- Contain child components
- Be added as a child to a parent component

When a parent component unloads, all its children are automatically unloaded as well.

Each component in the tree goes through the following lifecycle methods:

- `onload()`
  - The parent component is loaded
  - The component gets loaded explicitly (via `component.load()`)
  - When added to a loaded parent (via `parent.addChild(component)`)
- `onunload()`: 
  - The parent component is unloaded
  - The component gets unloaded explicitly (via `component.unload()`)
  - When removed from a parent (via `parent.removeChild(component)`)

This hierarchy allows clean organization and ensures that all subcomponents are properly destroyed.


## Passing Components to Other APIs

Some APIs in Obsidian accept a `Component` parameter to help manage lifecycle.
The most common example is the `MarkdownRenderer.render` method, which requires a `Component` to track the rendering context.

```ts
MarkdownRenderer.render(app, "## Some Markdown", containerEl, "", COMPONENT);
```

The `COMPONENT` parameter allows the `MarkdownRenderer` to register itself as a child component of the provided component.
This means that when the parent component unloads, the renderer will also be cleaned up automatically.

A common mistake that is often made, is that a `Component` is created just for the purpose of passing it to such APIs, but is never actually loaded or unloaded.

```ts
import { Component, ItemView, MarkdownRenderer } from 'obsidian';

class MyView extends ItemView {
	onload() {		
		// Bad: creating a temporary component that is never loaded/unloaded
		const tempComponent = new Component();
		MarkdownRenderer.render(this.app, "## Some Markdown", this.containerEl, "", tempComponent);
	}
}
```

As we have seen in previous sections, this component is never loaded or unloaded, so the renderer will never be cleaned up!

Instead, you should pass a component that is loaded and unloaded properly, and should live for just as long - but never longer - as the view.
Luckily, _every_ view is also a `Component`, so we can simply pass the `View` instance itself!

```ts
import { ItemView, MarkdownRenderer } from 'obsidian';

class MyView extends ItemView {
	onload() {		
		// Good: using the view itself (`this`) as the component
		MarkdownRenderer.render(this.app, "## Some Markdown", this.containerEl, "", this);
	}
}
```


## Creating Your Own Components

You can define your own components by extending the `Component` class.
This is useful when you have a logical unit (such as a widget or view) that manages its own state or resources.

```ts
import { Component, MarkdownRenderer } from "obsidian";
import SomeLibrary from "some-library";

class MyWidget extends Component {
	private widget: HTMLElement = createDiv({ cls: "my-widget" });
	private lib: SomeLibrary;

	constructor(private app: App) {
		super();
	}

	onload() {
		MarkdownRenderer.render(this.app, "## Some Markdown", this.widget, "", this);
		document.body.appendChild(this.widget);

		this.lib = new SomeLibrary();
		this.lib.initialize();

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

This widget class fully encapsulates its own lifecycle: it sets up everything it needs during `onload`, and cleans up automatically during `onunload`.


Now, you can add an instance of your `MyWidget` component (or multiple!) to your plugin (or another component), making it part of the hierarchy. Whenever the parent unloads, the child is unloaded as well.

```ts
class MyPlugin extends Plugin {
	// Creates the widget component, but it is not initialized yet!
	private widget: MyWidget = new MyWidget(this.app)

	onload() {
		// Add the widget as a child component, which will automatically load it,
		// as the parent (the plugin) is already loaded.
		this.widget = this.addChild(this.widget);
		
		// And use it as needed
		this.widget.doSomething();
	}
	
	onunload() {
		// The widget will be automatically unloaded with the plugin
	}
	
	removeWidget() {
		// Unloads the widget component manually
		this.removeChild(this.widget);
	}
}
```

By structuring your plugin around components, you gain clear ownership of resources, automatic cleanup, and easier debugging of lifecycle issues.

## Summary

- Use the `Component` class to manage and clean up resources.
- Register intervals, events, and DOM listeners through helper methods (`registerEvent`, `registerInterval`, `registerDomEvent`).
- Pass a `Component` to APIs like `MarkdownRenderer.render` to ensure proper lifecycle handling.
- Organize your plugin into smaller `Component` subclasses to simplify ownership.
- Remember: if you create a resource, make sure it's cleaned up by `onunload`.
