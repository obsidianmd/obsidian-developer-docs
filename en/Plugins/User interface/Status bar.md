To create a new block in the status bar, call the [[addStatusBarItem|addStatusBarItem()]] in the `onload()` method. The `addStatusBarItem()` method returns an [[HTML elements]] that you can add your own elements to.

> [!caution] Obsidian mobile
> Custom status bar items [are **not** supported](https://discord.com/channels/686053708261228577/707816848615407697/832321402106544179) on Obsidian mobile apps.

```ts
import { Plugin } from "obsidian";

export default class ExamplePlugin extends Plugin {
  async onload() {
    const item = this.addStatusBarItem();
    item.createEl("span", { text: "Hello from the status bar 👋" });
  }
}
```

> [!note]
> For more information on how to use the `createEl()` method, refer to [[HTML elements]].

You can add multiple status bar items by calling `addStatusBarItem()` multiple times. Since Obsidian adds a gap between them, you need to create multiple HTML element on the same status bar item if you need more control of spacing.

```ts
import { Plugin } from "obsidian";

export default class ExamplePlugin extends Plugin {
  async onload() {
    const fruits = this.addStatusBarItem();
    fruits.createEl("span", { text: "🍎" });
    fruits.createEl("span", { text: "🍌" });

    const veggies = this.addStatusBarItem();
    veggies.createEl("span", { text: "🥦" });
    veggies.createEl("span", { text: "🥬" });
  }
}
```

The example above results in the following status bar:

![[status-bar.png]]
