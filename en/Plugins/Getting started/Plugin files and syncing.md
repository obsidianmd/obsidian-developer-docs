---
aliases:
  - Plugin files
---
When a user installs or updates your plugin, Obsidian copies a fixed set of files into the plugin folder. Obsidian Sync carries a similar fixed set of files between devices. Knowing both lists helps you decide how to package your code, your styles, and your data.

## Files in the plugin folder

Each plugin lives in its own folder, `<vault>/<config folder>/plugins/<plugin id>/`, where the config folder is `.obsidian` by default. Obsidian uses four files in that folder:

| File            | Written by                                    | Contents                                                            |
| --------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| `manifest.json` | Obsidian, on install and update               | The plugin's [[Manifest\|manifest]].                                |
| `main.js`       | Obsidian, on install and update               | All of the plugin's code, bundled into a single file.               |
| `styles.css`    | Obsidian, on install and update (optional)    | The plugin's styles.                                                |
| `data.json`     | Your plugin, through [[saveData\|saveData()]] | The plugin's settings and data, read with [[loadData\|loadData()]]. |

## Install and update

When a user installs or updates your plugin from the community directory, Obsidian downloads `manifest.json`, `main.js`, and `styles.css` from the GitHub release whose tag matches the version, and writes them to the plugin folder. If the release has no `styles.css`, Obsidian deletes the `styles.css` left by a previous version, if any.

Obsidian downloads nothing else. Other files attached to the release are ignored, and there's no assets folder, archive format, or support for native modules. Obsidian downloads all three files before it writes any of them, so a failed download leaves the installed version as it was.

This means that:

- All your JavaScript, including every dependency, must be bundled into `main.js`. A bundler such as esbuild, which the [sample plugin](https://github.com/obsidianmd/obsidian-sample-plugin) uses, does this for you.
- Static assets, such as images, fonts, JSON data, or WebAssembly, must be bundled into `main.js` or `styles.css`, for example as data URLs.
- Your plugin must not install or update itself or its dependencies. Refer to [[Developer policies]].
- An update leaves `data.json` and any other file in the plugin folder untouched.

## Obsidian Sync

Obsidian Sync syncs a plugin folder only when the user has turned on **Installed community plugins** in the [Sync settings](https://help.obsidian.md/sync/settings). Even then, it syncs only these four files, directly inside the plugin folder:

- `manifest.json`
- `main.js`
- `styles.css`
- `data.json`

Obsidian Sync ignores everything else in the plugin folder, including:

- Any other file, such as a cache or an asset your plugin writes next to `data.json`.
- Any subfolder of the plugin folder.
- Any file or folder whose name begins with a `.`, and any `node_modules` folder.

Each file is also limited by the maximum file size of the user's [Sync plan](https://help.obsidian.md/sync/plans): 5 MB on the Standard plan, and 199 MB on the Plus plan. A `main.js` or a `data.json` larger than 5 MB doesn't sync for a user on the Standard plan.

> [!note] Other sync services
> These rules apply to Obsidian Sync only. Other services, such as iCloud, Syncthing, or Git, may copy the whole plugin folder, or skip parts of it. Don't rely on any file outside the list above being present, or absent, on another device.

Obsidian Sync also skips every file and folder in the vault whose name begins with a `.`, except the config folder. If your plugin asks users to keep files in the vault, such as scripts or templates, suggest a folder whose name doesn't begin with a `.`.

## Store plugin data

Choose where to store data based on where it needs to be available:

- **Data for every device**: Store it in `data.json` with [[saveData|saveData()]]. When `data.json` changes on disk, for example because Obsidian Sync brought a change from another device, Obsidian calls [[onExternalSettingsChange|onExternalSettingsChange()]], so implement it to reload your settings. Your own `saveData()` calls don't trigger it. If a user changes your settings while **Installed community plugins** is off and then turns it back on, Sync merges `data.json` with the remote copy key by key: keys added on this device are kept, but the remote value replaces a local change to an existing key.
- **Data for one device**: Store it with [[saveLocalStorage|App.saveLocalStorage()]], which keeps a value for the current vault on the current device and never syncs.
- **Secrets**: Store API keys and tokens with [[SecretStorage]]. Refer to [[Store secrets]].
- **Large data**: Keep `data.json` well below 5 MB so that it syncs on every plan. Store large data in the vault, where the user controls how it syncs, or rebuild it on each device.
