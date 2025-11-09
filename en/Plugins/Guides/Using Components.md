---
permalink: plugins/guides/using-components
---

The `Component` class is a useful tool for managing the lifecycle of UI elements and other classes in Obsidian plugins. It provides a consistent way to handle setup and teardown logic, and helps ensure that your plugin cleans up resources correctly when it is unloaded.

In this guide, we'll explore how to use the `Component` class effectively in your Obsidian plugins.
For more details about the `Component` class, see the [API reference](/Reference/TypeScript+API/Component).

## Overview

Under the hood, the `Plugin`, `View`, and `Menu` classes all extend from `Component`.  
This means that they share the same lifecycle management patterns for loading, unloading, and managing child components.

By using `Component` in your own classes, you can:

- Organize your plugin logic into modular, self-contained components.
- Automatically clean up event listeners, DOM elements, and intervals.
- Avoid memory leaks and dangling references when unloading.
- Manage external or heavy resources, such as libraries, WebAssembly modules or network clients, safely.

A `Component` is considered **loaded** after its `load()` method has been called, and **unloaded** after its `unload()` method completes. When a component is unloaded, all of its registered resources and child components are automatically cleaned up.


## Adding a window resize listener

Imagine you want to respond to window resize events in your plugin.  
A naïve approach might look like this:

```ts
// Bad
class MyPlugin extends Plugin {
	onload() {
		window.addEventListener("resize", onResize);
	}
}
```

However, when the user disables your plugin, the resize listener will continue to run until Obsidian is restarted.
This can lead to unnecessary memory usage or even errors if your handler references unloaded data.

To fix this, you might manually remove the listener in `onunload`:

```ts
// Better
class MyPlugin extends Plugin {
	onload() {
		window.addEventListener("resize", onResize);
	}
	
	onunload() {
		window.removeEventListener("resize", onResize);
	}
}
```

While this works, it is easy to forget or duplicate cleanup code across different parts of your plugin.
Fortunately, since the `Plugin` class extends `Component`, you can use the `registerDomEvent` helper to handle this automatically:

```ts
// Good
class MyPlugin extends Plugin {
	onload() {
		this.registerDomEvent(window, "resize", onResize);
	}
}
```

Whenever your plugin is unloaded, Obsidian will automatically detach the resize listener, this way you don't have to worry about it!



## Handling different types of events

In addition to DOM events, `Component` provides helper methods for managing other kinds of resources that need cleanup, such as event listeners within Obsidian itself or active intervals.

```ts
class MyPlugin extends Plugin {
	onload() {
		// Register an event listener from Obsidian's `Events` system
		this.registerEvent(this.app.vault.on("modify", onFileModify, this));

		// Register an interval (automatically cleared on unload)
		const intervalId = setInterval(onIntervalTick, 1000);
		this.registerInterval(intervalId);
	}
}
```

These registration methods ensure that all listeners and intervals are released when your component unloads.
You can use `register()` for generic cleanup callbacks that don't fall into any of these categories.


## Defining your own components

Beyond `Plugin`, `View`, and other built-in types, you can define your own classes that extend `Component`.
This makes it easy to encapsulate behavior and manage resources for reusable parts of your plugin, such as controllers, widgets, or data managers.

Here's an example that renders some Markdown in a DOM element, initializes an imaginary external library, and handles window resize events:

```ts
import { Component } from "obsidian";
import SomeLibrary from "some-lib";

class MyWidget extends Component {
	private container: HTMLElement;
	private lib: SomeLibrary;

	constructor(private app: App) {
		super();
	}
	
	onload() {
		// Add an element to the DOM and render Markdown in it
		// The MarkdownRenderer takes the current component as its parent, and adds itself as a child component.
		this.container = document.createDiv({ cls: "my-widget" });
		MarkdownRenderer.render(this.app, "## Some Markdown", this.container, "", this);
		document.body.appendChild(this.container);

		// Initialize an external resource
		this.lib = new SomeLibrary();
		this.lib.initialize();

		// Handle window resize automatically
		this.registerDomEvent(window, "resize", () => {
			this.lib.resize(window.innerWidth, window.innerHeight);
		});
	}
	
	doSomething() {
		this.lib.doSomething();
	}

	onunload() {
		// Clean up when the widget is unloaded
		this.container.remove();
		this.lib.destroy();
	}
}
```

This widget encapsulates its own lifecycle, initializing when loaded, and cleaning up when unloaded.

Now, you can attach your `MyWidget` component to your plugin or other components, forming a clear hierarchy of resources.
When a parent component is loaded or unloaded, all of its child components are automatically loaded or unloaded too.

```ts
class MyPlugin extends Plugin {
	private widget: MyWidget;

	onload() {
		// Add the widget as a child component
		this.widget = this.addChild(new MyWidget(this.app));
		
		// And use it as needed
		this.widget.doSomething();
	}
	
	onunload() {
		// The widget will automatically unload with the plugin
	}
	
	temporarilyUnloadWidget() {
		// You can also unload it temporarily if needed
		this.widget.unload();
		window.setTimeout(() => this.widget.load(), 5000);
	}
	
	removeWidget() {
		// You can also explicitly remove it at any time
		this.removeChild(this.widget);
	}
}
```

## Summary

Using the `Component` class allows your plugin to safely manage lifecycle-bound resources in a structured way.
By taking advantage of built-in helpers like `registerDomEvent`, `registerEvent`, and `registerInterval`, you can ensure that your plugin unloads cleanly without memory leaks or dangling references.

When designing your plugin's architecture, consider extending or composing `Component` objects whenever you need lifecycle-aware behavior.
This will help keep your code modular, predictable, and easy to maintain.

