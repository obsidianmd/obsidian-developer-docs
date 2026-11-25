---
permalink: plugins/guides/secret-storage
aliases:
  - SecretStorage and SecretComponent
---
[[SecretStorage]] provides a secure way to store and manage sensitive data like API keys and tokens in Obsidian plugins. Instead of storing secrets directly in your plugin's `data.json` file, SecretStorage offers a centralized key-value store that allows users to share secrets across multiple plugins.

In this guide, you'll learn how to let users pick a secret in your plugin settings and how to read its value with [[SecretStorage]].

> [!important] Requires Obsidian 1.13.2+
> The `secret` setting control used in this guide requires Obsidian 1.13.2. If your plugin's `minAppVersion` is lower, see [[#Support older Obsidian versions]].

## What you'll learn

After you've completed this guide, you'll be able to:

- Declare a secret setting with `getSettingDefinitions()`.
- Retrieve stored secrets using the SecretStorage API.
- Understand why SecretStorage improves security and user experience.

## Before you start

This guide assumes you're familiar with creating plugin settings in Obsidian. If you haven't already, read [[Settings]] to understand how to declare settings with `getSettingDefinitions()` and save plugin configuration.

## Why use SecretStorage?

When plugins store secrets directly in `data.json`, several problems arise:

- **Security**: Secrets are stored in plaintext alongside other plugin data.
- **Duplication**: Users must copy the same API key into every plugin that needs it.
- **Maintenance**: If a token changes, users must update every plugin manually.

SecretStorage addresses these issues by providing a central store for secrets. Users save each secret with a name, and any plugin can reference it by that name.

![[settings-secret-list.png]]

## Step 1: Update your settings interface

Add a property to your settings that will store the *name* of a secret, not the secret value itself.

```ts
export interface MyPluginSettings {
  apiKeySecret: string;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
  apiKeySecret: '',
};
```

## Step 2: Declare a secret setting

In your settings tab, return a definition whose `control` has `type: 'secret'`. Its `key` names the settings property from step 1:

```ts
import { App, PluginSettingTab, SettingDefinitionItem } from 'obsidian';
import MyPlugin from './main';

export class MySettingTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  getSettingDefinitions(): SettingDefinitionItem[] {
    return [
      {
        name: 'API key',
        desc: 'Select a secret from SecretStorage.',
        control: { type: 'secret', key: 'apiKeySecret' },
      },
    ];
  }
}
```

Obsidian renders the row with a **Link...** button. It opens a dialog where the user selects an existing secret or adds a new one. When the user saves their choice, Obsidian writes the secret's *name* to `this.plugin.settings.apiKeySecret` and calls `saveData()` for you, the same as for any other `control`. The secret value itself never reaches `data.json`.

![[settings-secretcomponent.png]]

> [!warning] Don't add the field in `display()`
> On Obsidian 1.13.0 and later, `display()` isn't called when `getSettingDefinitions()` returns a non-empty array. A field you build in `display()` next to your definitions never appears in the settings tab. Declare it as a definition instead.

## Step 3: Retrieve the secret value

When your plugin needs the actual secret value, look it up by the name stored in your settings:

```ts
const secret = this.app.secretStorage.getSecret(this.settings.apiKeySecret);
if (secret === null) {
  // The user hasn't selected a secret yet, or the selected secret no longer exists.
  return;
}
// Use secret here.
```

`getSecret()` returns `null` when no secret has that name. The actual secret is stored in local storage, keyed to the specific vault.

## Complete example

Here's the full settings tab:

```ts
import { App, PluginSettingTab, SettingDefinitionItem } from 'obsidian';
import MyPlugin from './main';

export interface MyPluginSettings {
  apiKeySecret: string;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
  apiKeySecret: '',
};

export class MySettingTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  getSettingDefinitions(): SettingDefinitionItem[] {
    return [
      {
        name: 'API key',
        desc: 'Select a secret from SecretStorage.',
        control: { type: 'secret', key: 'apiKeySecret' },
      },
    ];
  }
}
```

## Support older Obsidian versions

The `secret` control requires Obsidian 1.13.2. If your plugin supports older versions, build the row yourself with [[SecretComponent]], which is available since Obsidian 1.11.4.

On 1.13.0 and later, you can do this inside a `render` callback in `getSettingDefinitions()`. A `render` callback doesn't save for you, so save the settings in `onChange`:

```ts
{
  name: 'API key',
  desc: 'Select a secret from SecretStorage.',
  render: (setting) => {
    setting.addComponent((el) => new SecretComponent(this.app, el)
      .setValue(this.plugin.settings.apiKeySecret)
      .onChange(async (value) => {
        this.plugin.settings.apiKeySecret = value ?? '';
        await this.plugin.saveData(this.plugin.settings);
      }));
  },
}
```

On versions before 1.13.0, use the same `addComponent` call on a `Setting` you create in `display()`, as described in [[Settings#Legacy: imperative display() approach]]. If your plugin keeps both `display()` and `getSettingDefinitions()`, see [[Migrate to declarative settings#Path B: dual support]].

## FAQ

### Why does the imperative API use `addComponent` instead of a method like `addText`?

Unlike other setting components, `SecretComponent` requires the `App` instance in its constructor to access the SecretStorage API. The standard `addText`, `addToggle`, and similar methods don't pass `App` to their callbacks. The `Setting#addComponent` method gives you full control over component instantiation, allowing you to pass the required `App` reference. With the declarative API, the `secret` control does this for you.
