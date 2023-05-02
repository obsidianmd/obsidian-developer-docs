---
cssClass: reference
---

Every new version of Obsidian may introduce new capabilities for plugins. Unfortunately, using a recently introduced plugin capability in your plugin may break installations for users that haven't yet updated to the latest version of Obsidian. To avoid this, `versions.json` lets you control the plugin version based on the version of the user's Obsidian app.

`versions.json` contains a JSON object, where the key is the plugin version, and the value is the corresponding `minAppVersion`.

If a user attempts to install a plugin where the Obsidian app version is lower than the `minAppVersion` in [[Reference/Manifest|Manifest]], then Obsidian looks for a `versions.json` file at the root of the plugin repository.

In the following example, the user has Obsidian 1.1.0 installed, but the plugin `minAppVersion` is 1.2.0.

**manifest.json**:

```json
{
  // ...

  "version": "1.0.0",
  "minAppVersion": "1.2.0"
}
```

If the user runs version 1.1.0 of the Obsidian app, Obsidian then consults the `versions.json` to determine whether a fallback is available.

**versions.json**:

```json
{
  "0.1.0": "1.0.0",
  "0.12.0": "1.1.0",
}
```

In this case, the most recent plugin version for 1.1.0 is 0.12.0.

> [!important]
> You don't need to list every plugin relese in the `versions.json`. You only need to update `versions.json` if you change the `minAppVersion` for your plugin.
