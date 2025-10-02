Bases is a core plugin in Obsidian which display dynamic views of your notes as tables, cards, lists, and more. If you're unfamiliar with Bases, please read about them in the [help docs](https://help.obsidian.md/bases) before getting started.

Plugins can use the Obsidian API to create completely custom views of the data powering Bases. In this tutorial, you'll walk through extending the sample plugin to create a simplified version of the list view.

## What you'll learn

After you've completed this tutorial, you'll be able to:

- Create a custom [Bases view](help.obsidian.md/bases/views).
- Dynamically render data from note properties in a list format.

## Prerequisites

To complete this tutorial, you'll need:

- [Git](https://git-scm.com/) installed on your local machine.
- A local development environment for [Node.js](https://Node.js.org/en/about/).
- A code editor, such as [Visual Studio Code](https://code.visualstudio.com/).

Additionally, this tutorial will build off of the sample plugin created in a previous tutorial. Please follow the ["Build a plugin" tutorial](Plugins/Getting+started/Build+a+plugin) before starting this tutorial.

## Before you start

When developing plugins, one mistake can lead to unintended changes to your vault. To prevent data loss, you should never develop plugins in your main vault. Always use a separate vault dedicated to plugin development.

[Create an empty vault](https://help.obsidian.md/Getting+started/Create+a+vault#Create+empty+vault).

## Step 1: Sample plugin setup

In this tutorial it is assumed that you have a directory on your computer with the sample plugin and that you know how to build your plugin and test it in Obsidian.

For the purposes of this List view plugin, we can remove a large portion of the code from the `MyPlugin` class, leaving just the `onload` function.

```TypeScript
export default class MyPlugin extends Plugin {
  async onload() {
  }
}
```

## Step 2: Create and register the Bases view

Once you have an empty plugin which can be built and loaded into Obsidian, you can start to add a Bases view. Start with a view that statically displays "Hello World".

```TypeScript
export const ExampleViewType = 'example-view';

export default class MyPlugin extends Plugin {
  async onload() {
    // Tell Obsidian about the new view type that this plugin provides.
    this.registerBasesView(ExampleViewType, {
      name: 'Example',
      icon: 'lucide-graduation-cap',
      factory: (controller, containerEl) => new MyBasesView(controller, containerEl),
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

  // onDataUpdated is called by Obsidian whenever there is a configuration or data change
  // in the vault which may affect your view. For now, simply draw "Hello World" to screen.
  public onDataUpdated(): void {
    this.containerEl.empty();
    this.containerEl.createDiv({ text: 'Hello World' });
  }
}
```

Build your plugin, reload the app, and create a new Base file. Use the menu on the left of the toolbar, and select the right chevron next to the view in the list. From this menu, change the layout to your newly created "Example" view type.

![[example-bases-view-hello-world.jpg]]

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
      factory: (controller, containerEl) => new MyBasesView(controller, containerEl),
      options: () => ([
		{
			type: 'text',                      // The type of option. 'text' is a text input.
			displayName: 'Property separator', // The name displayed in the settings menu
			key: 'separator',                  // The value saved to the view settings
			default: ' - ',                    // The default value for this option
		},
		// ...
	  ]),
    });
  }
}
```

![[example-bases-view-configuration.gif]]

## Step 4: Display list items

The final step in creating a new Bases view is to actually transform the data from properties into the format you want to display. Obsidian will call the `onDataUpdated` method on your view whenever there are changes to the data. To keep this example simple, the code below clears the container, and rerenders a list entry for every file provided in the data set. It is important, however, to keep in mind the best practices of web development. An unfiltered Base will provide an entry for every file in the vault, so your view should be able to handle thousands of entries and reuse DOM elements and avoid rendering off screen where appropriate.

```typescript
// Add `implements HoverParent` to enable hovering over file links.
export class MyBasesView extends BasesView implements HoverParent {

  hoverPopover: HoverPopover | null;

  // ...

  public onDataUpdated(): void {
    const { app } = this;

    // Retrieve the user configured order they set in the Properties toolbar menu.
    const order = this.config.getOrder()

    // Clear entries created by previous iterations. Remember, you should instead
    // attempt element reuse when possible.
    this.containerEl.empty();

    // The property separator configured by the ViewOptions above can be retrieved
    // from the view config. Be sure to set a default value.
    const propertySeparator = String(this.config.get(PROPERTY_SEPARATOR_KEY) || DEFAULT_PROPERTY_SEPARATOR);

    // this.data contains both grouped and ungrouped versions of the data.
    // If it's appropriate for your view type, use the grouped form.
    for (const group of this.data.groupedData) {
      const groupEl = this.containerEl.createDiv('bases-list-group');
      const groupListEl = groupEl.createEl('ul', 'bases-list-group-list');

      // Each entry in the group is a separate file in the vault which matched the Base filters.
      // For the list view, each entry will be a separate line.
      for (const entry of group.entries) {
        groupListEl.createEl('li', 'bases-list-entry', (el) => {
          let firstProp = true;
          for (const propertyName of order) {
            // Properties in the order can be parsed to determine what type they are: formula, note, or file.
            const { type, name } = parsePropertyId(propertyName);
  
            // `entry.getValue` returns the evaluated result of the property in the context of this entry.
            const value = entry.getValue(propertyName);
  
            // Completely skip rendering properties which have an empty value.
            // This means the list items for each file may have differing length.
            if (value.isEmpty()) continue;
  
            if (!firstProp) {
              el.createSpan({ cls: 'bases-list-separator', text: propertySeparator });
            }
            firstProp = false;
  
            // If the `file.name` property is included in the order, render
            // it specially so that it links to that file.
            if (name === 'name' && type === 'file') {
              const linkEl = el.createEl('a', { text: String(entry.file.name) });
              linkEl.onClickEvent((evt) => {
                if (evt.button !== 0 && evt.button !== 1) return;
                evt.preventDefault();
                void app.workspace.openLinkText(entry.file.path, '', Keymap.isModEvent(evt));
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
            // For all other properties, just display the value as text. In your view
            // you may also choose to use the `Value.renderTo` API to better support photos, links, icons, etc.
            else {
              el.createSpan({ cls: 'bases-list-entry-property', text: value.toString() });
            }
          }
        });
      }
    }
  }
}
```

Build your plugin again with the changes and reload the app. Your Base should now display a list item for every file in the vault!

![[example-bases-view-complete.jpg]]

TODO: Add links to api docs, discord channels, etc.
