---
cssClass: reference
---

This page describes the schema for the manifest, `manifest.json`.

## Properties

The following properties are available for both plugins and themes.

| Property        | Type                                | Required | Description                                                                     |
| --------------- | ----------------------------------- | -------- | ------------------------------------------------------------------------------- |
| `author`        | `string`                            | **Yes**  | The author's name.                                                              |
| `minAppVersion` | `string`                            | **Yes**  | The minimum required Obsidian version.                                          |
| `name`          | `string`                            | **Yes**  | The display name.                                                               |
| `version`       | `string`                            | **Yes**  | The version, using [Semantic Versioning](https://semver.org/).                  |
| `authorUrl`     | `string`                            | No       | A URL to the author's website.                                                  |
| `fundingUrl`    | `string` or [`object`](#fundingurl) | No       | A URL or multiple URLs to where the users can support your project financially. |

## Plugin-specific properties

The following properties are only available to plugins.

| Property        | Type      | Required | Description                                       |
| --------------- | --------- | -------- | ------------------------------------------------- |
| `description`   | `string`  | **Yes**  | A description of your plugin.                     |
| `id`            | `string`  | **Yes**  | The ID of your plugin.                            |
| `isDesktopOnly` | `boolean` | **Yes**  | Whether your plugin uses NodeJS or Electron APIs. |

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
