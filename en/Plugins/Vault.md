Each collection of notes in Obsidian is known as a Vault. A Vault consists of a folder, and any sub-folders within it.

While your plugin can access the file system like any other Node.js application, the [[Reference/TypeScript API/Vault|Vault]] module aims to make it easier to work with files and folders within a Vault.


> [!NOTE]
> The Vault API only allows access to the files visible inside the app, files included in hidden folders can only be accessed using the Adapter API.


The following example recursively prints the paths of all Markdown files in a Vault:

```ts
const files = this.app.vault.getMarkdownFiles()

for (let i = 0; i < files.length; i++) {
  console.log(files[i].path);
}
```

> [!tip]
> If you want to list _all_ files, and not just Markdown documents, use [[getFiles|getFiles()]] instead.

## Read files

There are two methods for reading the content of a file: [[Reference/TypeScript API/Vault/read|read()]] and [[cachedRead|cachedRead()]].

- If you only want to display the content to the user, then use `cachedRead()` to avoid reading the file from disk multiple times.
- If you want to read the content, change it, and then write it back to disk, then use `read()` to avoid potentially overwriting the file with a stale copy.

> [!info]
> The only difference between `cachedRead()` and `read()` is when the file was modified outside of Obsidian just before the plugin reads it. As soon as the file system notifies Obsidian that the file has changed from the outside, `cachedRead()` behaves _exactly_ like `read()`. Similarly, if you save the file within Obsidian, the read cache is flushed as well.

The following example reads the content of all Markdown files in the Vault and returns the average document size:

```ts
import { Notice, Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.addRibbonIcon('info', 'Calculate average file length', async () => {
      const fileLength = await this.averageFileLength();
      new Notice(`The average file length is ${fileLength} characters.`);
    });
  }

  async averageFileLength(): Promise<number> {
    const { vault } = this.app;

    const fileContents: string[] = await Promise.all(
      vault.getMarkdownFiles().map((file) => vault.cachedRead(file))
    );

    let totalLength = 0;
    fileContents.forEach((content) => {
      totalLength += content.length;
    });

    return totalLength / fileContents.length;
  }
}
```

> [!info]
> Obsidian runs every file operation of the Vault and Adapter APIs through one queue, one at a time. A read never overlaps a write, even when another plugin makes it. `Promise.all()` over these calls works, as in the example above, but it doesn't make them faster: they still run one after another. You only gain from running things in parallel when the work isn't file access, such as network requests.

## Modify files

To write text content to an existing file, use [[modify|Vault.modify()]].

```ts
function writeCurrentDate(vault: Vault, file: TFile): Promise<void> {
  return vault.modify(file, `Today is ${new Intl.DateTimeFormat().format(new Date())}.`);
}
```

If you want to modify a file based on its current content, use [[process|Vault.process()]] instead. The second argument is a callback that provides the current file content and returns the modified content.

```ts
// emojify replaces all occurrences of :) with 🙂.
function emojify(vault: Vault, file: TFile): Promise<string> {
  return vault.process(file, (data) => {
    return data.replace(':)', '🙂');
  })
}
```

`Vault.process()` is an abstraction on top of [[Reference/TypeScript API/Vault/read|Vault.read()]] and [[modify|Vault.modify()]] that guarantees that the file doesn't change between reading the current content and writing the updated content. Always prefer `Vault.process()` over `Vault.read()`/`Vault.modify()` to avoid unintentional loss of data.

Keep the callback synchronous and free of side effects: compute the new content from `data` and return it. If the callback returns a promise, `process()` fails and the file isn't changed. The callback runs while Obsidian holds the file queue, so a file operation you start from it waits until the callback has returned. If the callback returns the content unchanged, Obsidian doesn't write the file.

### Asynchronous modifications

[[process|Vault.process()]] only supports synchronous modifications. If you need to modify a file asynchronously:

1. Read the file using [[cachedRead|Vault.cachedRead()]].
2. Perform the async operations.
3. Update the file using [[Reference/TypeScript API/Vault/process|Vault.process()]].

Remember to check that the `data` in the `process()` callback is the same as the data returned by `cachedRead()`. If they aren't the same, that means that the file was changed by a different process, and you may want to ask the user for confirmation, or try again.

### Avoid frequent saves

Obsidian writes a file in place. It doesn't write a temporary file and then rename it over the original. While a write is in progress, the file on disk is incomplete, so another app that reads it at that moment, or a write that is interrupted, for example because the device shuts down, can leave a partial file behind.

Don't write a file on every keystroke or every small change. Debounce the writes, or write once the user is done.

## Delete files

There are two methods to delete a file, [[delete|delete()]], and [[trash|trash()]]. Which one you should use depends on if you want to allow the user to change their mind.

- `delete()` removes the file without a trace.
- `trash()` moves the file to the trash bin.

When you use `trash()`, you have the option to move the file to the system's trash bin, or to a local  `.trash` folder at the root of the user's Vault.

## Is it a file or folder?

Some operations return or accept a [[TAbstractFile|TAbstractFile]] object, which can be either a file or a folder. Always check the concrete type of a `TAbstractFile` before you use it.

```ts
const folderOrFile = this.app.vault.getAbstractFileByPath('folderOrFile');

if (folderOrFile instanceof TFile) {
  console.log('It\'s a file!');
} else if (folderOrFile instanceof TFolder) {
  console.log('It\'s a folder!');
}
```

## React to changes

Vault events such as [[Reference/TypeScript API/Vault/on('modify')|modify]] fire for every change to a file, whoever made it: your plugin, another plugin, the user, or another app such as a cloud sync client. The API can't tell you where a change came from.

So a handler for `modify`, or for the metadata cache's [[Reference/TypeScript API/MetadataCache/on('changed')|changed]] event, also runs for every file that a sync client downloads, and for the changes your own plugin makes. Keep these handlers cheap. If a handler writes to the file it was called for, make sure the write doesn't trigger the same change again, or your plugin ends up in a loop.

## Read metadata

The [[MetadataCache|metadata cache]] (`app.metadataCache`) holds what Obsidian has parsed from each Markdown file, such as headings, links, tags, and frontmatter. Use [[getFileCache|getFileCache()]] to get the [[CachedMetadata|CachedMetadata]] of a file.

### Check for null

`getFileCache()` returns `null` while a file hasn't been parsed yet. Obsidian parses files in the background, so this happens when a large vault is opened for the first time, until the initial index is complete. It also happens for a moment after a file changes outside Obsidian.

Right after your own plugin changes a file, for example once `Vault.modify()` has resolved, `getFileCache()` can still return the metadata of the old content, until the new content has been parsed.

Always check the result for `null`. If you need the metadata of a file right after it changed, wait for the `changed` event for that file instead of reading the cache straight away.

```ts
this.registerEvent(
  this.app.metadataCache.on('changed', (file, data, cache) => {
    // `cache` holds the metadata parsed from the new content of `file`.
    console.log(file.path, cache.headings?.length ?? 0);
  })
);
```

### Don't modify the cached metadata

`getFileCache()` returns the cached objects themselves, not copies. If you change them, for example by sorting `cache.links` in place, you change the metadata that Obsidian and every other plugin read. Copy an array or object before you change it.

```ts
const cache = this.app.metadataCache.getFileCache(file);
const sortedLinks = [...(cache?.links ?? [])].sort((a, b) => a.link.localeCompare(b.link));
```

### What gets indexed

Obsidian decides which files to parse by their extension: it parses Markdown (`.md`) files only. For other files, such as `.txt` or `.canvas` files, `getFileCache()` returns an empty object and their links aren't indexed. Inside a Markdown file, links and tags in a comment (`%%...%%`) are indexed too. To keep data out of the index, store it in a file with a different extension.
