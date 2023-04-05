This page describe the schema for the manifest, `manifest.json`.

## Properties

The following properties are available for both plugins and themes.

| Property        | Type    | Required | Description                                                    |
|-----------------|---------|----------|----------------------------------------------------------------|
| `author`        | string  | **Yes**  | The author's name.                                             |
| `minAppVersion` | string  | **Yes**  | The minimum required Obsidian version.                         |
| `name`          | string  | **Yes**  | The display name.                                              |
| `version`       | string  | **Yes**  | The version, using [Semantic Versioning](https://semver.org/). |
| `authorUrl`     | string  | No       | A URL to the author's website.                                 |
| `fundingUrl`    | string  | No       | A URL to where the users can support your project.             |

## Plugin-specific properties

The following properties are only available to plugins.

| Property        | Type    | Required | Description                                            |
|-----------------|---------|----------|--------------------------------------------------------|
| `description`   | string  | **Yes**  | A description of your plugin.                          |
| `id`            | string  | **Yes**  | The ID of your plugin.                                 |
| `isDesktopOnly` | boolean | **Yes**  | Whether your plugin uses NodeJS or Electron APIs.      |
