This page lists common review comments plugin authors get when submitting their plugin.

For more information about general guidelines for developers, refer to [[Developer policies]].

## Use `normalizePath()` to clean up user-defined paths

Use [[obsidian.normalizepath|normalizePath()]] whenever you accept user-defined paths to files or folders in the vault, or when you construct your own paths in the plugin code.

`normalizePath()` takes a path and scrubs it to be safe for the file system and for cross-platform use. This function:

- Cleans up the use of forward and backward slashes, such as replacing 1 or more of `\` or `/` with a single `/`.
- Removes leading and trailing forward and backward slashes.
- Replaces any non-breaking spaces, `\u00A0`, with a regular space.
- Runs the path through [String.prototype.normalize](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize).

```ts
import { normalizePath } from "obsidian";
const pathToPlugin = normalizePath(app.vault.configDir + "//plugins/my-plugin");
// pathToPlugin contains ".obsidian/plugins/my-plugin" not .obsidian//plugins/my-plugin
```
