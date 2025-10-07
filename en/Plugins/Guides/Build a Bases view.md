---
permalink: plugins/guides/bases-view
---
Bases is a core plugin in Obsidian which display dynamic views of your notes as tables, cards, lists, and more. If you're unfamiliar with Bases, please read about them in the [help docs](https://help.obsidian.md/bases) before getting started.

Plugins can use the Obsidian API to create completely custom views of the data powering Bases. In this guide, you'll walk through extending the sample plugin to create a simplified version of the list view.

## What you'll learn

After you've completed this guide, you'll be able to:

- Create a custom [Bases view](https://help.obsidian.md/bases/views).
- Dynamically render data from note properties in a list format.

## Prerequisites

To complete this guide, you'll need:

- [Git](https://git-scm.com/) installed on your local machine.
- A local development environment for [Node.js](https://Node.js.org/en/about/).
- A code editor, such as [Visual Studio Code](https://code.visualstudio.com/).

Additionally, this guide will build off of the sample plugin created in a previous guide. Follow the [[Build a plugin]] guide before starting this guide.

## Before you start

When developing plugins, one mistake can lead to unintended changes to your vault. To prevent data loss, you should never develop plugins in your main vault. Always use a separate vault dedicated to plugin development.

[Create an empty vault](https://help.obsidian.md/Getting+started/Create+a+vault#Create+empty+vault).

## Step 1: Sample plugin setup

In this guide it is assumed that you have a directory on your computer with the sample plugin and that you know how to build your plugin and test it in Obsidian.

For the purposes of this list view plugin, we can remove a large portion of the code from the `MyPlugin` class, leaving just the `onload` function.

```TypeScript
export default class MyPlugin extends Plugin {
  async onload() {
  }
}
```

## Step 2: Create and register the Bases view

Once you have an empty plugin which can be built and loaded into Obsidian, you can begin building a Bases view. Start with a view that statically displays "Hello World".

```TypeScript
export const ExampleViewType = 'example-view';

export default class MyPlugin extends Plugin {
  async onload() {
    // Tell Obsidian about the new view type that this plugin provides.
    this.registerBasesView(ExampleViewType, {
      name: 'Example',
      icon: 'lucide-graduation-cap',
      factory: (controller, containerEl) => {
        new MyBasesView(controller, containerEl)
      },
    });
  }
}

export class MyBasesView extends BasesView {
  readonly type = ExampleViewType;
  private containerEl: HTMLElement;

  constructor(controller: QueryController, parentEl: HTMLElement) {
    super(controller);
    this.containerEl = parentEl.createDiv('bases-example-view-container');
  }

  // onDataUpdated is called by Obsidian whenever there is a configuration
  // or data change in the vault which may affect your view. For now,
  // simply draw "Hello World" to screen.
  public onDataUpdated(): void {
    this.containerEl.empty();
    this.containerEl.createDiv({ text: 'Hello World' });
  }
}
```

Build your plugin, reload the app, and create a new Base file. Use the menu on the left of the toolbar, and select the right chevron next to the view in the list. From this menu, change the layout to your newly created "Example" view type.

## Step 3: Add configuration

The menu where you changed the view layout can also contain additional configuration options for your view. Add an `options` property in the call to `registerBasesView`.

In your IDE, you can view the definition of `ViewOption` to see the different controls available. Each control will create an entry in the view configuration menu, and user input will automatically be stored in the Bases configuration file.

```typescript
export default class MyPlugin extends Plugin {
  async onload() {
    // Tell Obsidian about the new view type that this plugin provides.
    this.registerBasesView(ExampleViewType, {
      name: "Example",
      icon: 'lucide-graduation-cap',
      factory: (controller, containerEl) => {
        new MyBasesView(controller, containerEl)
      },
      options: () => ([
        {
          // The type of option. 'text' is a text input.
          type: 'text',
          // The name displayed in the settings menu.
          displayName: 'Property separator',
          // The value saved to the view settings.
          key: 'separator',
          // The default value for this option.
          default: ' - ',
        },
        // ...
    ]),
    });
  }
}
```

![[example-bases-view-configuration.gif#interface]]

## Step 4: Display list items

The final step in creating a new Bases view is to transform the data from properties into the format you want to display. Obsidian will call the `onDataUpdated` method on your view whenever there are changes to the data. To keep this example simple, the code below clears the container, and rerenders a list entry for every file provided in the data set. It is important, however, to keep in mind the best practices of web development. An unfiltered Base will provide an entry for every file in the vault, so your view should be able to handle thousands of entries, reuse DOM elements, and avoid rendering off screen where appropriate.

```typescript
// Add `implements HoverParent` to enable hovering over file links.
export class MyBasesView extends BasesView implements HoverParent {

  hoverPopover: HoverPopover | null;

  // ...

  public onDataUpdated(): void {
    const { app } = this;

    // Retrieve the user configured order set in the Properties menu.
    const order = this.config.getOrder()

    // Clear entries created by previous iterations. Remember, you should
    // instead attempt element reuse when possible.
    this.containerEl.empty();

    // The property separator configured by the ViewOptions above can be
    // retrieved from the view config. Be sure to set a default value.
    const propertySeparator = String(this.config.get('separator')) || ' - ';

    // this.data contains both grouped and ungrouped versions of the data.
    // If it's appropriate for your view type, use the grouped form.
    for (const group of this.data.groupedData) {
      const groupEl = this.containerEl.createDiv('bases-list-group');
      const groupListEl = groupEl.createEl('ul', 'bases-list-group-list');

      // Each entry in the group is a separate file in the vault matching
      // the Base filters. For list view, each entry is a separate line.
      for (const entry of group.entries) {
        groupListEl.createEl('li', 'bases-list-entry', (el) => {
          let firstProp = true;
          for (const propertyName of order) {
            // Properties in the order can be parsed to determine what type
            // they are: formula, note, or file.
            const { type, name } = parsePropertyId(propertyName);
  
            // `entry.getValue` returns the evaluated result of the property
            // in the context of this entry.
            const value = entry.getValue(propertyName);
  
            // Skip rendering properties which have an empty value.
            // The list items for each file may have differing length.
            if (value.isEmpty()) continue;
  
            if (!firstProp) {
              el.createSpan({
                cls: 'bases-list-separator',
                text: propertySeparator
              });
            }
            firstProp = false;
  
            // If the `file.name` property is included in the order, render
            // it specially so that it links to that file.
            if (name === 'name' && type === 'file') {
              const fileName = String(entry.file.name);
              const linkEl = el.createEl('a', { text: fileName });
              linkEl.onClickEvent((evt) => {
                if (evt.button !== 0 && evt.button !== 1) return;
                evt.preventDefault();
                const path = entry.file.path;
                const modEvent = Keymap.isModEvent(evt);
                void app.workspace.openLinkText(path, '', modEvent);
              });
  
              linkEl.addEventListener('mouseover', (evt) => {
                app.workspace.trigger('hover-link', {
                  event: evt,
                  source: 'bases',
                  hoverParent: this,
                  targetEl: linkEl,
                  linktext: entry.file.path,
                });
              });
            }
            // For all other properties, just display the value as text.
            // In your view you may also choose to use the `Value.renderTo`
            // API to better support photos, links, icons, etc.
            else {
              el.createSpan({
                cls: 'bases-list-entry-property',
                text: value.toString()
              });
            }
          }
        });
      }
    }
  }
}
```

Rebuild your plugin and reload the app. Your Base should now display a list item for every file in the vault!

## Conclusion

Congratulations on building your first Bases view! Bases are a powerful new way to view the data in your vault and we can't wait to see what new views you create.

This website contains the full API reference for Bases. Here are a couple places to get started:

- [[BasesView|BasesView]]
- [[BasesViewConfig|BasesViewConfig]]
- [[BasesEntryGroup|BasesEntryGroup]]

If you have any questions, please join the [Obsidian Discord server](https://discord.gg/obsidianmd) and ask in the "obsidian-bases" or "plugin-dev" channels.
