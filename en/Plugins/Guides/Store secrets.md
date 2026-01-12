---
permalink: plugins/guides/secret-storage
aliases:
  - SecretStorage and SecretComponent
---
[[SecretStorage]] provides a secure way to store and manage sensitive data like API keys and tokens in Obsidian plugins. Instead of storing secrets directly in your plugin's `data.json` file, SecretStorage offers a centralized key-value store that allows users to share secrets across multiple plugins.

In this guide, you'll learn how to use [[SecretStorage]] and [[SecretComponent]] to securely handle secrets in your plugin settings.

## What you'll learn

After you've completed this guide, you'll be able to:

- Replace direct secret input with the SecretComponent.
- Retrieve stored secrets using the SecretStorage API.
- Understand why SecretStorage improves security and user experience.

## Before you start

This guide assumes you're familiar with creating plugin settings in Obsidian. If you haven't already, read [[Settings]] to understand how to create a settings tab and save plugin configuration.

## Why use SecretStorage?

When plugins store secrets directly in `data.json`, several problems arise:

- **Security**: Secrets are stored in plaintext alongside other plugin data.
- **Duplication**: Users must copy the same API key into every plugin that needs it.
- **Maintenance**: If a token changes, users must update every plugin manually.

SecretStorage addresses these issues by providing a central store for secrets. Users save each secret with a name, and any plugin can reference it by that name.

![[settings-secret-list.png]]

## Step 1: Update your settings interface

Start with a typical plugin settings setup. The `mySetting` property will store the *name* of a secret, not the secret value itself.

```ts
import { App, PluginSettingTab, Setting } from "obsidian";
import MyPlugin from "./main";

export interface MyPluginSettings {
  mySetting: string;
}
```

## Step 2: Add the SecretComponent to your settings tab

Replace the standard text input with a `SecretComponent`. Import `SecretComponent` from `obsidian` and use the `addComponent` method on your `Setting`:

```ts
import { App, PluginSettingTab, SecretComponent, Setting } from "obsidian";
import MyPlugin from "./main";

export class SampleSettingTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('API key')
      .setDesc('Select a secret from SecretStorage')
      .addComponent(el => new SecretComponent(this.app, el)
        .setValue(this.plugin.settings.mySetting)
        .onChange(value => {
          this.plugin.settings.mySetting = value;
          this.plugin.saveSettings();
        }));
  }
}
```

The `SecretComponent` presents users with an interface to select from existing secrets or create a new one. When saved, your plugin settings contain the *name* of the secret, not the actual secret value.

![[settings-secretcomponent.png]]

## Step 3: Retrieve the secret value

When your plugin needs the actual secret value, use the `SecretStorage` API:

```ts
const secret = app.secretStorage.get(this.settings.mySetting);
if (secret) { // secret value might be null

}
```

This retrieves the secret value associated with the name stored in your settings. The actual secret is stored in local storage, keyed to the specific vault.

## Complete example

Here's the full settings tab implementation:

```ts
import { App, PluginSettingTab, SecretComponent, Setting } from "obsidian";
import MyPlugin from "./main";

export interface MyPluginSettings {
  mySetting: string;
}

export class SampleSettingTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('API key')
      .setDesc('Select a secret from SecretStorage')
      .addComponent(el => new SecretComponent(this.app, el)
        .setValue(this.plugin.settings.mySetting)
        .onChange(value => {
          this.plugin.settings.mySetting = value;
          this.plugin.saveSettings();
        }));
  }
}
```

## FAQ

### Why does SecretComponent use `addComponent` instead of having its own method like `addText`?

Unlike other setting components, `SecretComponent` requires the `App` instance in its constructor to access the SecretStorage API. The standard `addText`, `addToggle`, and similar methods don't pass `App` to their callbacks. The `Setting#addComponent` method gives you full control over component instantiation, allowing you to pass the required `App` reference.
