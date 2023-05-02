Many of the interfaces in the Obsidian lets you subscribe to events throughout the application, for example when the user makes changes to a file.

Any registered event handlers need to be detached whenever the plugin unloads. The safest way to make sure this happens is to use the [[registerEvent|registerEvent()]] method.

```ts
import { Plugin } from "obsidian";

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.registerEvent(this.app.vault.on('create', () => {
      console.log('a new file has entered the arena')
    }));
  }
}
```

## Timing events

If you want to repeatedly call a function with a fixed delay, use the [`window.setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) function with the [[registerInterval|registerInterval()]] method.

The following example displays the current time in the status bar, updated every second:

```ts
import { moment, Plugin } from "obsidian";

export default class ExamplePlugin extends Plugin {
  statusBar: HTMLElement;

  async onload() {
    this.statusBar = this.addStatusBarItem();

    this.updateStatusBar();

    this.registerInterval(
      window.setInterval(() => this.updateStatusBar(), 1000)
    );
  }

  updateStatusBar() {
    this.statusBar.setText(moment().format("H:mm:ss"));
  }
}
```

> [!tip] Date and time
> [Moment](https://momentjs.com/) is a popular JavaScript library for working with dates and time. Obsidian uses Moment internally, so you don't need to install it yourself. You can import it from the Obsidian API instead:
>
> ```ts
> import { moment } from "obsidian";
> ```
