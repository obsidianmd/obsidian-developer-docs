---
aliases: "obsidian.MetadataCache.md"
cssclasses: hide-title
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[`MetadataCache`](obsidian.MetadataCache.md)

## MetadataCache class

Linktext is any internal link that is composed of a path and a subpath, such as "My note\#Heading" Linkpath (or path) is the path part of a linktext Subpath is the heading/block ID part of a linktext.

**Signature:**

```typescript
export class MetadataCache extends Events 
```
**Extends:** [`Events`](obsidian.Events.md)

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [`resolvedLinks`](obsidian.MetadataCache.resolvedLinks.md) |  | <code>Record</code><code>&lt;string, </code><code>Record</code><code>&lt;string, number&gt;&gt;</code> | Contains all resolved links. This object maps each source file's path to an object of destination file paths with the link count. Source and destination paths are all vault absolute paths that comes from <code>TFile.path</code> and can be used with <code>Vault.getAbstractFileByPath(path)</code>. |
|  [`unresolvedLinks`](obsidian.MetadataCache.unresolvedLinks.md) |  | <code>Record</code><code>&lt;string, </code><code>Record</code><code>&lt;string, number&gt;&gt;</code> | Contains all unresolved links. This object maps each source file to an object of unknown destinations with count. Source paths are all vault absolute paths, similar to <code>resolvedLinks</code>. |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [`fileToLinktext(file, sourcePath, omitMdExtension)`](obsidian.MetadataCache.fileToLinktext.md) |  | <p>Generates a linktext for a file.</p><p>If file name is unique, use the filename. If not unique, use full path.</p> |
|  [`getCache(path)`](obsidian.MetadataCache.getCache.md) |  |  |
|  [`getFileCache(file)`](obsidian.MetadataCache.getFileCache.md) |  |  |
|  [`getFirstLinkpathDest(linkpath, sourcePath)`](obsidian.MetadataCache.getFirstLinkpathDest.md) |  | Get the best match for a linkpath. |
|  [`on(name, callback, ctx)`](obsidian.MetadataCache.on.md) |  | <p>Called when a file has been indexed, and its (updated) cache is now available.</p><p>Note: This is not called when a file is renamed for performance reasons. You must hook the vault rename event for those. (Details: https://github.com/obsidianmd/obsidian-api/issues/77)</p> |
|  [`on(name, callback, ctx)`](obsidian.MetadataCache.on_1.md) |  | Called when a file has been deleted. A best-effort previous version of the cached metadata is presented, but it could be null in case the file was not successfully cached previously. |
|  [`on(name, callback, ctx)`](obsidian.MetadataCache.on_2.md) |  | Called when a file has been resolved for <code>resolvedLinks</code> and <code>unresolvedLinks</code>. This happens sometimes after a file has been indexed. |
|  [`on(name, callback, ctx)`](obsidian.MetadataCache.on_3.md) |  | Called when all files has been resolved. This will be fired each time files get modified after the initial load. |
