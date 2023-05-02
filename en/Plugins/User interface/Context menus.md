If you want to open up a context menu, use [[Menu|Menu]]:

```ts
import { Menu, Notice, Plugin } from "obsidian";

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.addRibbonIcon("dice", "Open menu", (event) => {
      const menu = new Menu();

      menu.addItem((item) =>
        item
          .setTitle("Copy")
          .setIcon("documents")
          .onClick(() => {
            new Notice("Copied");
          })
      );

      menu.addItem((item) =>
        item
          .setTitle("Paste")
          .setIcon("paste")
          .onClick(() => {
            new Notice("Pasted");
          })
      );

      menu.showAtMouseEvent(event);
    });
  }
}
```

[[showAtMouseEvent|showAtMouseEvent()]] opens the menu where you clicked with the mouse.

> [!tip]
> If you need more control of where the menu appears, you can use `menu.showAtPosition({ x: 20, y: 20 })` to open the menu at a position relative to the top-left corner of the Obsidian window.

For more information on what icons you can use, refer to [[Plugins/User interface/Icons|Icons]].

You can also add an item to the file menu, or the editor menu, by subscribing to the `file-menu` and `editor-menu` workspace events:

![[context-menu-positions.png]]

```ts
import { Notice, Plugin } from "obsidian";

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        menu.addItem((item) => {
          item
            .setTitle("Print file path 👈")
            .setIcon("document")
            .onClick(async () => {
              new Notice(file.path);
            });
        });
      })
    );

  this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor, view) => {
        menu.addItem((item) => {
          item
            .setTitle("Print file path 👈")
            .setIcon("document")
            .onClick(async () => {
              new Notice(view.file.path);
            });
        });
      })
    );
  }
}
```

For more information on handling events, refer to [[Events]].
