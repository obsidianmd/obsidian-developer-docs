Commands are actions that the user can perform from the [Command Palette](https://help.obsidian.md/Plugins/Command+palette) or by using a hot key.

![[command.png]]

To register a new command for your plugin, call the [[addCommand|addCommand()]] method inside the `onload()` method:

```ts
import { Plugin } from "obsidian";

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "print-greeting-to-console",
      name: "Print greeting to console",
      callback: () => {
        console.log("Hey, you!");
      },
    });
  }
}
```

## Conditional commands

If your command is only able to run under certain conditions, then consider using [[checkCallback|checkCallback()]] instead.

The `checkCallback` runs twice. First, to perform a preliminary check to determine whether the command can run. Second, to perform the action.

Since time may pass between the two runs, you need to perform the check during both calls.

To determine whether the callback should perform a preliminary check or an action, a `checking` argument is passed to the callback.

- If `checking` is set to `true`, perform a preliminary check.
- If `checking` is set to `false`, perform an action.

The command in the following example depends on a required value. In both runs, the callback checks that the value is present but only performs the action if `checking` is `false`.

```ts
this.addCommand({
  id: 'example-command',
  name: 'Example command',
  // highlight-next-line
  checkCallback: (checking: boolean) => {
    const value = getRequiredValue();

    if (value) {
      if (!checking) {
        doCommand(value);
      }

      return true
    }

    return false;
  },
});
```

## Editor commands

If your command needs access to the editor, you can also use the [[editorCallback|editorCallback()]], which provides the active editor and its view as arguments.

```ts
this.addCommand({
  id: 'example-command',
  name: 'Example command',
  editorCallback: (editor: Editor, view: MarkdownView) => {
    const sel = editor.getSelection()

    console.log(`You have selected: ${sel}`);
  },
}
```

> [!note]
> Editor commands only appear in the Command Palette when there's an active editor available.

If the editor callback can only run given under certain conditions, consider using the [[editorCheckCallback|editorCheckCallback()]] instead. For more information, refer to [[#Conditional commands]].

```ts
this.addCommand({
  id: 'example-command',
  name: 'Example command',
  editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
    const value = getRequiredValue();

    if (value) {
      if (!checking) {
        doCommand(value);
      }

      return true
    }

    return false;
  },
});
```

## Hot keys

The user can run commands using a keyboard shortcut, or _hot key_. While they can configure this themselves, you can also provide a default hot key.

> [!warning]
> Avoid setting default hot keys for plugins that you intend for others to use. Hot keys are highly likely to conflict with those defined by other plugins or by the user themselves.

In this example, the user can run the command by pressing and holding Ctrl (or Cmd on Mac) and Shift together, and then pressing the letter `a` on their keyboard.

```ts
this.addCommand({
  id: 'example-command',
  name: 'Example command',
  hotkeys: [{ modifiers: ["Mod", "Shift"], key: "a" }],
  callback: () => {
    console.log('Hey, you!');
  },
});
```

> [!note]
> The Mod key is a special modifier key that becomes Ctrl on Windows and Linux, and Cmd on macOS.
