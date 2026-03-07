---
cssclasses: reference
---

This page describes the schema for the manifest, `manifest.json`.

## Properties

The following properties are available for both plugins and themes.

| Property        | Type                                | Required | Description                                                                          |
| --------------- | ----------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| `author`        | `string`                            | **Yes**  | The author's name.                                                                   |
| `minAppVersion` | `string`                            | **Yes**  | The minimum required Obsidian version.                                               |
| `name`          | `string`                            | **Yes**  | The display name.                                                                    |
| `version`       | `string`                            | **Yes**  | The version, using [Semantic Versioning](https://semver.org/) in the format `x.y.z`. |
| `authorUrl`     | `string`                            | No       | A URL to the author's website.                                                       |
| `fundingUrl`    | `string` or [`object`](#fundingurl) | No       | A URL or multiple URLs to where the users can support your project financially.      |

## Plugin-specific properties

The following properties are only available to plugins.

| Property        | Type      | Required | Description                                                                                                                            |
| --------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------|
| `description`   | `string`  | **Yes**  | A description of your plugin.                                                                                                          |
| `id`            | `string`  | **Yes**  | The ID of your plugin. The ID must contain only lowercase letters and hyphens, can't end with `plugin`, and can't contain `obsidian`.  |
| `isDesktopOnly` | `boolean` | **Yes**  | Whether the plugin can be used only on desktop.                                                                                        |

> [!note]
> For local development, the `id` should match the plugin's folder name; otherwise some methods, such as `onExternalSettingsChange`, won't be called.

## name

`name` is a string containing the display name for your plugin or theme.

Theme names cannot be changed once the theme has been submitted to the community directory. You can update your plugin names in the community directory by changing the `name` field in `manifest.json`. If the new name is invalid, the directory delists the plugin until you resolve the problem.

- Make your name short and descriptive.
- Prefer English names and use [Basic Latin](https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block)) characters only. No punctuation (except hyphens, plus sign, and parenthesis), emoji, or special characters are allowed. In the future we will offer options for localization.
- Do not use the name of Obsidian core plugins and features. For example, "Live Preview" or "Bases" are not acceptable plugin names on their own.
- Do not include the word "Obsidian" or variations like "Obsi-" and "-sidian".
- Every plugin and theme must have a unique name.
- Do not use profanity, explicit language, or other terms that would be prohibited by our [Code of Conduct](https://obsidian.md/help/community-code-of-conduct).
- Themes may not contain the word "Theme", and plugins may not contain the word "Plugin".

## fundingUrl

`fundingUrl` can either be a string with a single URL, or an object with multiple URLs.

**Single URL**:

```json
{
  "fundingUrl": "https://buymeacoffee.com"
}
```

**Multiple URLs**:

```json
{
  "fundingUrl": {
    "Buy Me a Coffee": "https://buymeacoffee.com",
    "GitHub Sponsor": "https://github.com/sponsors",
    "Patreon": "https://www.patreon.com/"
  }
}
```
