---
aliases: "Plugin.onExternalSettingsChange"
cssclasses: hide-title
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[`Plugin`](Plugin) › [`onExternalSettingsChange`](Plugin/onExternalSettingsChange)

## Plugin.onExternalSettingsChange() method

Called when the `data.json` file is modified on disk externally from Obsidian. This usually means that a Sync service or external program has modified the plugin settings.

Implement this method to reload plugin settings when they have changed externally.

**Signature:**

```typescript
onExternalSettingsChange?(): any;
```
**Returns:**

`any`

