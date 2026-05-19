If you want users to be able to configure parts of your plugin themselves, you can expose them as _settings_.

In this guide, you'll learn how you can create a settings page like this 👇

![[settings.png]]

> [!important] Requires Obsidian 1.13.0+
> The declarative settings API documented on this page (`getSettingDefinitions()`) requires Obsidian 1.13.0, which is currently in an insider build. If you need to support older Obsidian versions, see [[Migrate to declarative settings#Path B: dual support|the dual-support pattern]]. For the pre-1.13 imperative approach, jump to [[#Legacy: imperative display() approach]].

The main reason to add settings to a plugin is to store configuration that persists even after the user quits Obsidian. The following example demonstrates how to save and load settings from disk:

```ts
import { Plugin } from 'obsidian';
import { ExampleSettingTab } from './settings';

interface ExamplePluginSettings {
  sampleValue: string;
}

const DEFAULT_SETTINGS: Partial<ExamplePluginSettings> = {
  sampleValue: 'Lorem ipsum',
};

export default class ExamplePlugin extends Plugin {
  settings: ExamplePluginSettings;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new ExampleSettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
```

There's a lot going on here 🤯, so let's look closer at each part.

## Create a settings definition

First, you need to define which settings you want the user to be able to configure. Therefore, you create an interface, `ExamplePluginSettings`. While the plugin is enabled, you can access its settings from the `settings` member variable, which in our example is of type `ExamplePluginSettings`.

```ts
interface ExamplePluginSettings {
  sampleValue: string;
}

export default class ExamplePlugin extends Plugin {
  settings: ExamplePluginSettings;

  // ...
}
```

## Save and load the settings object

[[loadData|loadData()]] and [[saveData|saveData()]] provide an easy way to store and retrieve data from disk. The example also introduces two helper methods that make it easier to use `loadData()` and `saveData()` from other parts of the plugin.

```ts
export default class ExamplePlugin extends Plugin {

  // ...

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
```

Finally, make sure to load the settings when the plugin loads:

```ts
async onload() {
  await this.loadSettings();

  // ...
}
```

## Provide default values

When the user enables the plugin for the first time, none of the settings have been configured yet. The preceding example provides default values for any missing settings.

To understand how this works, have a look at the following code:

```ts
Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
```

`Object.assign()` is a JavaScript function that copies all properties from one object to another. Any properties that are returned by `loadData()` override the properties in `DEFAULT_SETTINGS`.

```ts
const DEFAULT_SETTINGS: Partial<ExamplePluginSettings> = {
  sampleValue: 'Lorem ipsum',
};
```

> [!tip]
> `Partial<Type>` is a TypeScript utility that returns a type with all properties of `Type` set to optional. It enables type checking while letting you only define the properties you want to provide defaults for.

## Register a settings tab

The plugin can now save and load plugin configuration, but the user doesn't yet have any way of changing any of the settings. By adding a settings tab you can provide an easy-to-use interface for the user to update their plugin settings:

```ts
this.addSettingTab(new ExampleSettingTab(this.app, this));
```

Here, `ExampleSettingTab` is a class that extends [[PluginSettingTab|PluginSettingTab]] and overrides `getSettingDefinitions()` to describe the settings declaratively:

```ts
import ExamplePlugin from './main';
import { App, PluginSettingTab } from 'obsidian';

export class ExampleSettingTab extends PluginSettingTab {
  plugin: ExamplePlugin;

  constructor(app: App, plugin: ExamplePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  getSettingDefinitions() {
    return [
      {
        name: 'Default value',
        control: {
          type: 'text' as const,
          key: 'sampleValue',
          placeholder: 'Lorem ipsum',
        },
      },
    ];
  }
}
```

Each `control` definition's `key` names a property on `this.plugin.settings`. The framework reads the current value, writes changes back, and calls `saveData()` automatically — no `onChange` plumbing required. If your plugin stores settings somewhere other than `this.plugin.settings` (a Svelte store, an immutable update pattern, etc.), see [[#Custom settings storage]].

To move an existing tab that uses `display()`, see [[Migrate to declarative settings]].

## Definition shapes

Each entry returned by `getSettingDefinitions()` is one of the following:

- A setting with a `control` — declarative binding to one settings key. Preferred for simple settings. See [[#Control types]].
- A setting with a `render` callback — full control over the `Setting` row. Use for side effects, derived values, or custom UI. See [[#Render callback]].
- A setting with an `element` callback — raw DOM, for banners or non-setting layouts. See [[#Custom elements]].
- A setting with an `action` callback — a clickable row that runs your function. Common inside lists.
- A `SettingDefinitionGroup` — a heading and a nested list of definitions. See [[#Groups]].
- A `SettingDefinitionPage` — a navigable sub-page. See [[#Sub-pages]].

> [!important] Mutual exclusion
> `control`, `render`, `element`, and `action` on a single definition are mutually exclusive. TypeScript will reject more than one.

> [!warning] Keep `getSettingDefinitions()` cheap
> The framework calls `getSettingDefinitions()` every time the tab updates AND once when the tab is registered (to index settings for global search). Don't perform file reads, network calls, or expensive computation here. Move heavy work into `render` callbacks, which run only when the row is drawn.

## Control types

A `control` definition reads and writes one key on your settings object. The framework handles `saveData()` for you.

| Type | Stored value | Notes |
| --- | --- | --- |
| `toggle` | `boolean` | |
| `text` | `string` | Optional `placeholder`. |
| `textarea` | `string` | Optional `placeholder`, `rows`. |
| `number` | `number` | Optional `min`, `max`, `step`, `placeholder`. Commits on blur or Enter. Out-of-range and unparseable input shows an inline error and rejects the change. |
| `slider` | `number` | `min`, `max`, `step` all required. |
| `dropdown` | `string` | `options: { value: 'Display', … }`. |
| `file` | `string` (path) | Optional `filter: (file: TFile) => boolean`, `placeholder`. |
| `folder` | `string` (path) | Optional `filter: (folder: TFolder) => boolean`, `includeRoot` (default `false`), `placeholder`. |
| `color` | `string` (hex) | |

Every control also accepts an optional `defaultValue` — the fallback when the stored value is `undefined` or `null` — and an optional `validate` callback (see [[#Validating input]]).

### Toggle

```ts
{ name: 'Open in foreground', control: { type: 'toggle', key: 'openInForeground' } }
```

### Text

```ts
{
  name: 'Folder name',
  control: { type: 'text', key: 'folder', placeholder: '/' },
}
```

### Textarea

```ts
{
  name: 'Notes',
  control: { type: 'textarea', key: 'notes', rows: 4 },
}
```

### Number

```ts
{
  name: 'Cache size (MB)',
  control: { type: 'number', key: 'cacheMb', min: 1, max: 500, defaultValue: 50 },
}
```

### Slider

```ts
{
  name: 'Volume',
  control: { type: 'slider', key: 'volume', min: 0, max: 100, step: 1 },
}
```

### Dropdown

```ts
{
  name: 'Default mode',
  control: {
    type: 'dropdown',
    key: 'mode',
    defaultValue: 'edit',
    options: { edit: 'Editing', read: 'Reading' },
  },
}
```

### File

```ts
{
  name: 'Template file',
  control: {
    type: 'file',
    key: 'template',
    filter: (file) => file.extension === 'md',
  },
}
```

### Folder

```ts
{
  name: 'Output folder',
  control: { type: 'folder', key: 'outputDir', includeRoot: true },
}
```

### Color picker

```ts
{ name: 'Accent color', control: { type: 'color', key: 'accent' } }
```

### What's not yet a first-class control

Some patterns from the imperative API don't have a dedicated declarative control type:

- **Moment-format inputs** — use a `render` callback with `addMomentFormat()`.
- **Progress bars** — use a `render` callback with `addProgressBar()`, or `element` for a static layout.
- **Custom suggesters** beyond file and folder — use a `render` callback with `addSearch()` and your own [[AbstractInputSuggest]] subclass.
- **Multi-button rows** — use a `render` callback and chain multiple `addButton()` calls.
- **Standalone buttons** — use a definition with `action` for a clickable row, or a `render` callback when you need a button inside a setting row.

Each of these can also be implemented with the imperative API documented in [[#Legacy: imperative display() approach]].

## Validating input

Every `control` accepts an optional `validate` callback. Return a non-empty string to reject the change and surface it as an inline error below the input. Return `void`, `undefined`, or an empty string to accept the value.

```ts
{
  name: 'File extension',
  control: {
    type: 'text',
    key: 'extension',
    validate: (value) =>
      /\s/.test(value) ? 'Extension cannot contain spaces.' : undefined,
  },
}
```

Async validators work too — return a `Promise<string | void>`.

> [!warning] `validate` is a UI gate, not a data invariant
> The stored value may already be invalid when the setting is rendered (for example, data saved by an older version of your plugin). The framework runs `validate` once on mount and shows the message if the seeded value fails, but it does not modify or replace the stored value. If your plugin needs to enforce invariants on stored data, validate again when reading your settings — don't rely on `validate` alone.

<!-- TBD: screenshot of an inline validate error -->

`validate` is most useful on text-bearing controls (`text`, `textarea`, `number`, `file`, `folder`).

## Custom settings storage

By default, `control` definitions read and write `this.plugin.settings` directly — `key: 'sampleValue'` corresponds to `this.plugin.settings.sampleValue`. The framework also calls `this.plugin.saveData()` for you on every change.

If your plugin keeps settings somewhere other than the conventional `this.plugin.settings` field (a Svelte store, a reactive proxy, an immutable update mechanism), override `getControlValue` and `setControlValue` on your settings tab:

```ts
class MyTab extends PluginSettingTab {
  plugin: MyPlugin;

  getControlValue(key: string): unknown {
    return this.plugin.getStateValue(key);
  }

  setControlValue(key: string, value: unknown): void | Promise<void> {
    return this.plugin.updateState(key, value);
  }

  getSettingDefinitions() { /* … */ }
}
```

The framework calls `getControlValue(key)` on every render and `setControlValue(key, value)` on every user change. Both run fresh each time, so reassigning the underlying state object stays in sync with the open settings tab.

For the common case where you just store settings in `this.plugin.settings`, you don't need to override anything — the defaults handle it.

## Groups

A `SettingDefinitionGroup` gives a heading and shared layout to related settings.

### Inline groups

```ts
{
  type: 'group',
  heading: 'Advanced',
  items: [
    { name: 'Debug logging', control: { type: 'toggle', key: 'debug' } },
    { name: 'Cache size (MB)', control: { type: 'number', key: 'cacheMb', min: 1 } },
  ],
}
```

### Mod-list (mutable lists)

For settings where the user adds, removes, or reorders rows of the same kind — watched folders, tag aliases, blocked patterns — set `cls: 'mod-list'` on the group and provide `onDelete` (always) and `onReorder` (when order matters). The framework adds drag handles, a delete affordance, and Delete/Backspace handling on the focused row.

```ts
{
  type: 'group',
  heading: 'Watched folders',
  cls: 'mod-list',
  emptyState: 'No folders being watched yet.',
  extraButtons: [
    (btn) => btn
      .setIcon('lucide-plus')
      .setTooltip('Add folder')
      .onClick(() => this.openAddFolderModal()),
  ],
  onReorder: async (oldIndex, newIndex) => {
    let folders = this.plugin.settings.folders;
    let [moved] = folders.splice(oldIndex, 1);
    folders.splice(newIndex, 0, moved);
    await this.plugin.saveData(this.plugin.settings);
  },
  onDelete: async (idx) => {
    this.plugin.settings.folders.splice(idx, 1);
    await this.plugin.saveData(this.plugin.settings);
    this.update();
  },
  items: this.plugin.settings.folders.map((path) => ({
    name: path,
    searchable: false,
  })),
}
```

<!-- TBD: screenshot of a mod-list group with drag handles and delete buttons -->

Why each piece:

- `cls: 'mod-list'` applies the visual treatment (drag handle column, delete affordance, denser rows).
- `emptyState` is shown when `items` is empty. Plain string or `DocumentFragment`.
- `extraButtons` are header-level actions — the "add" button belongs here, not in the row list.
- `onReorder` callbacks receive `(oldIndex, newIndex)`. The DOM is already reordered; just update your data and save.
- `onDelete` wires both the delete button and the Delete/Backspace key. Always call `this.update()` after, since removing an entry changes the items array.
- `searchable: false` on each item keeps individual rows out of the global settings search.

For rows where each entry is a "click to do something" action (a list of registered commands the user can pin, for example), use the `action` field instead of `control`:

```ts
items: availableCommands.map((cmd) => ({
  name: cmd.name,
  searchable: false,
  action: () => {
    this.plugin.settings.pinned.push(cmd.id);
    void this.plugin.saveData(this.plugin.settings);
    this.update();
  },
})),
```

### Mod-list with a form modal

When new entries need a multi-field input or validation beyond a single inline text field, open a [[Modals|Modal]] from the header's add button. On mobile, where header icons are smaller and harder to tap, surface the same modal from a tappable action row at the top of the list. Both routes call the same opener.

```ts
let values: string[] = this.plugin.settings.entries ?? [];

let openAddForm = () => {
  new AddEntryModal(this.app, values, (entry) => {
    values.push(entry);
    this.plugin.settings.entries = values;
    void this.plugin.saveData(this.plugin.settings);
    this.update();
  }).open();
};

let groupItems = [];

if (Platform.isMobile) {
  groupItems.push({
    name: 'Add entry',
    searchable: false,
    action: openAddForm,
  });
}

groupItems.push({
  type: 'group',
  cls: 'mod-list',
  emptyState: 'No entries yet.',
  extraButtons: Platform.isMobile ? [] : [
    (btn) => btn
      .setIcon('lucide-plus')
      .setTooltip('Add entry')
      .onClick(openAddForm),
  ],
  onDelete: (idx) => {
    values.splice(idx, 1);
    void this.plugin.saveData(this.plugin.settings);
    this.update();
  },
  items: values.map((value) => ({
    name: value,
    searchable: false,
  })),
});

return groupItems;
```

The mobile action row sits *above* the mod-list group on purpose: it stays visible when the list is empty (paired with the group's `emptyState`), and it isn't subject to the list's delete affordance.

## Sub-pages

A `SettingDefinitionPage` is a navigable entry on the parent tab — clicking it slides in a sub-page with a back button. Use sub-pages sparingly: only when the parent tab is too long to scan, or the section has a self-contained scope (a dictionary, a font picker, an ignore list). If a section is just two or three settings, leave them on the parent tab.

Pages can nest. Page names must be unique among their siblings at the same depth — the framework logs a console error when duplicates are detected, since path-based navigation breaks otherwise.

### Declarative pages

The page content is a list of definitions. The framework renders the page automatically.

```ts
{
  type: 'page',
  name: 'Advanced',
  desc: 'Power-user options.',
  items: [
    { name: 'Debug logging', control: { type: 'toggle', key: 'debug' } },
    { name: 'Verbose errors', control: { type: 'toggle', key: 'verbose' } },
    {
      type: 'group',
      heading: 'Cache',
      items: [
        { name: 'Cache size (MB)', control: { type: 'slider', key: 'cacheMb', min: 1, max: 500, step: 1 } },
        { name: 'Clear cache', action: () => this.plugin.clearCache() },
      ],
    },
  ],
}
```

Always start with the declarative form. Reach for the imperative form only when this can't express what you need.

### Imperative pages

When the page's UI is computed from runtime state or interleaves rendered content with imperative DOM, subclass `SettingPage` and pass a factory:

```ts
import { SettingPage, Setting } from 'obsidian';

class StatusPage extends SettingPage {
  constructor(private plugin: MyPlugin) {
    super();
    this.title = 'Status';
  }

  display() {
    this.containerEl.empty();

    let stats = this.plugin.computeStats();
    this.containerEl.createEl('h3', { text: `${stats.totalEntries} entries` });
    this.containerEl.createEl('p', { text: `Last sync: ${stats.lastSync}` });

    new Setting(this.containerEl)
      .setName('Refresh now')
      .addButton((btn) => btn
        .setButtonText('Refresh')
        .onClick(async () => {
          await this.plugin.sync();
          this.display();
        }));
  }
}

// In getSettingDefinitions():
{
  type: 'page',
  name: 'Status',
  page: () => new StatusPage(this.plugin),
}
```

The factory runs each time the page is opened. `display()` runs whenever the page needs to redraw — call `this.display()` from inside the page itself to refresh after state changes.

`items` and `page` are mutually exclusive. Provide one or the other.

<!-- TBD: screenshot of a sub-page navigation chevron -->

## Render callback

Use a `render` callback when the setting needs anything beyond a simple bind — side effects, conditional visibility, custom UI, or suggesters not covered by `file` and `folder`.

```ts
{
  name: 'Enable feature X',
  render: (setting) => {
    setting.addToggle((toggle) => toggle
      .setValue(this.plugin.settings.featureX)
      .onChange(async (value) => {
        this.plugin.settings.featureX = value;
        this.plugin.applyFeatureX();
        await this.plugin.saveData(this.plugin.settings);
      }));
  },
}
```

> [!warning] `render` does not auto-save
> The framework only saves automatically for `control` bindings. Inside a `render` callback, always `await this.plugin.saveData(this.plugin.settings)` after mutating settings.

For settings that hide or show others based on another value, call `this.update()` from the parent's `onChange` to rebuild the definitions array. Don't call `this.display()` to refresh declarative content — on Obsidian 1.13.0+, the framework bypasses `display()` whenever `getSettingDefinitions()` returns a non-empty array.

## Custom elements

For banners, info text, or layouts that aren't a `Setting` row at all, use an `element` callback. The framework gives you the list container and otherwise stays out of the way.

```ts
{
  name: '',
  element: (listEl) => {
    listEl.createDiv({
      cls: 'callout',
      text: 'Heads up: this feature is experimental.',
    });
  },
}
```

## Style guide

### Sentence case for all UI text

Names, descriptions, headings, button labels, placeholders — anything the user reads in your tab. Only the first word and proper nouns are capitalized.

- ✅ "Template folder location" — ❌ "Template Folder Location"
- ✅ "Create new note" — ❌ "Create New Note"

### No top-level heading

Don't add a "General", "Settings", or plugin-name heading at the top of the tab. The tab title in the sidebar already names the plugin.

```ts
// ❌ Don't
return [
  { type: 'group', heading: 'My Plugin', items: [/* … */] },
];

// ✅ Do
return [
  { name: 'Foo', control: { type: 'toggle', key: 'foo' } },
  { name: 'Bar', control: { type: 'toggle', key: 'bar' } },
];
```

### Headings only when there are multiple sections

If the whole tab is one section, don't add any group heading. Add headings only once you have two or more distinct sections.

When there are multiple sections and one is "general", leave the general settings at the top with no heading and start headings at the second section. This mirrors what Obsidian's core tabs do.

```ts
return [
  // General — no heading
  { name: 'Default folder', control: { type: 'folder', key: 'folder' } },
  { name: 'Open on launch', control: { type: 'toggle', key: 'openOnLaunch' } },

  // Subsequent sections get headings
  { type: 'group', heading: 'Appearance', items: [/* … */] },
  { type: 'group', heading: 'Advanced', items: [/* … */] },
];
```

### Don't repeat "settings" in headings

Everything under the tab is settings; saying so in every heading is redundant.

- ✅ "Advanced" — ❌ "Advanced settings"
- ✅ "Templates" — ❌ "Settings for templates"

## Settings inside a modal

The declarative settings API is for `PluginSettingTab` only. If your plugin opens a [[Modals|Modal]] that needs setting rows, construct [[Setting|Setting]] and [[SettingGroup|SettingGroup]] directly against the modal's `contentEl` — modals build their UI imperatively.

## Legacy: imperative display() approach

> [!note]
> If your plugin's `minAppVersion` is below 1.13.0, you must use this approach or the dual-support pattern documented in [[Migrate to declarative settings#Path B: dual support]]. The imperative API remains supported indefinitely as a fallback on 1.13+, but the declarative API is preferred for new code.

Before 1.13.0, settings tabs were built by overriding `display()` and constructing `Setting` rows directly:

```ts
import ExamplePlugin from './main';
import { App, PluginSettingTab, Setting } from 'obsidian';

export class ExampleSettingTab extends PluginSettingTab {
  plugin: ExamplePlugin;

  constructor(app: App, plugin: ExamplePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Default value')
      .addText((text) =>
        text
          .setPlaceholder('Lorem ipsum')
          .setValue(this.plugin.settings.sampleValue)
          .onChange(async (value) => {
            this.plugin.settings.sampleValue = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
```

`display()` is where you build the content for the settings tab. For more information about container elements, refer to [[HTML elements]].

`new Setting(containerEl)` appends a setting to the container element. The [[Setting]] class provides methods like `setName` and `setDesc` to label the setting, plus a family of `add…` methods for each control type.

### Available components

The imperative API exposes additional components that don't have first-class declarative equivalents yet. You can still use them on Obsidian 1.13.0+ from inside a [[#Render callback]].

#### Headings

```ts
new Setting(containerEl).setName('Defaults').setHeading();
```

#### Search with suggestions

To provide users with a searchable list of available items, implement the [[AbstractInputSuggest]] class and hook it up to a search. (It also works with regular text inputs.)

![[settings-suggestions.png]]

```ts
new Setting(containerEl)
  .setName('Search')
  .addSearch((search) => {
    search.setValue(this.plugin.settings.icon)
      .setPlaceholder('Search for an icon')
      .onChange(async (value) => {
        this.plugin.settings.icon = value;
        await this.plugin.saveSettings();
      });
    new IconSuggest(this.plugin.app, search.inputEl);
  });
```

#### Moment format

Obsidian uses the [moment.js](https://momentjs.com/) library for formatting dates. The library supports custom tokens to customize the look of the resulting string. The [[MomentFormatComponent]] can render an example of the currently configured format.

```ts
const dateDesc = document.createDocumentFragment();
dateDesc.appendText('For a list of all available tokens, see the ');
dateDesc.createEl('a', {
  text: 'format reference',
  attr: { href: 'https://momentjs.com/docs/#/displaying/format/', target: '_blank' },
});
dateDesc.createEl('br');
dateDesc.appendText('Your current syntax looks like this: ');
const dateSampleEl = dateDesc.createEl('b', 'u-pop');

new Setting(containerEl)
  .setName('Date format')
  .setDesc(dateDesc)
  .addMomentFormat((momentFormat) => momentFormat
    .setValue(this.plugin.settings.dateFormat)
    .setSampleEl(dateSampleEl)
    .setDefaultFormat('MMMM dd, yyyy')
    .onChange(async (value) => {
      this.plugin.settings.dateFormat = value;
      await this.plugin.saveSettings();
    }));
```

#### Buttons

```ts
new Setting(containerEl)
  .setName('Button')
  .addButton((button) => button
    .setButtonText('Click me!')
    .onClick(() => {
      new Notice('This is a notice!');
    }));
```

You can also add multiple buttons to the same setting for performing different actions.

#### Extra button

This button can be added to any other settings type to reset it to the default value, for example.

```ts
new Setting(containerEl)
  .setName('Button')
  .setDesc('With extra button')
  .addButton((button) => button
    .setButtonText('Click me!')
    .onClick(() => {
      // ...
    }))
  .addExtraButton((button) => button
    .setIcon('gear')
    .onClick(() => {
      // ...
    }));
```

#### Progress bar

While a slider allows for numeric input, a progress bar can show the progress of a task running in the background. It can also be used to show a quota — for example, disk space used.

```ts
new Setting(containerEl)
  .setName('Progress bar')
  .setDesc('It\'s 50% done')
  .addProgressBar((bar) => bar.setValue(50));
```

To move an existing imperative tab to the declarative API, see [[Migrate to declarative settings]].
