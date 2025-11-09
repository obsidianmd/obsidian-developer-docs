---
description: A checklist for plugin developers to self-critique their plugins.
permalink: oo/plugin
aliases:
  - oo24/plugin
---
## Releasing and naming

- [ ] Remove placeholder names such as `MyPlugin` and `SampleSettingTab`.
- [ ] Don't include the word "Obsidian" in your name unless it absolutely makes sense. Most of the time it's redundant.
- [ ] Don't include your plugin name in command names. Obsidian adds this for you.
- [ ] Don't prefix commands with your plugin ID. Obsidian adds this for you.
- [ ] Don't include `main.js` in your repo. Only include it in your releases.
- [ ] If you haven't, consider add a `fundingUrl` so that users of your plugin can show some support. [Learn more](https://docs.obsidian.md/Reference/Manifest#fundingUrl).

## Compatibility

- [ ] Don't provide default hotkeys for commands. [Learn more](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Avoid+setting+a+default+hotkey+for+commands).
- [ ] Don't override core styling. If needed, add your own class and make the styling only apply to your class.
- [ ] Do scan your code for deprecated methods (they usually show up as strikeout text in IDEs).
- [ ] Don't assign styles via JavaScript or in HTML. [Learn more](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#No+hardcoded+styling).
- [ ] Don't access the hardcoded `.obsidian` folder if you need to access the configuration directory. The location could be customized, so please use `Vault.configDir` instead.

## Mobile support

Complete this section if you have `isDesktopOnly` set to false in your manifest.

- [ ] Don’t use Node.js modules such as `fs`, `path`, or `electron` at the top level. If needed, gate the functionality behind `Platform.isDesktopApp` and `require()` them dynamically at runtime.
- [ ] Don't use regex lookbehinds if you want to support iOS versions lower than 16.4 (ignore this if you don't use regex in your plugin). [Learn more](https://docs.obsidian.md/Plugins/Getting+started/Mobile+development#Lookbehind+in+regular+expressions).
- [ ] Don't cast `Vault.adapter` to `FileSystemAdapter`. All usages of `FileSystemAdapter` should be gated behind an `instanceof` check. On mobile, `Vault.adapter` will be an instance of `CapacitorAdapter`.
- [ ] Don't use `process.platform`, use Obsidian's `Platform` instead. [Link to API](https://docs.obsidian.md/Reference/TypeScript+API/Platform).
- [ ] Don't use `fetch` or `axios.get`, use Obsidian's `requestUrl` instead. [Link to API](https://docs.obsidian.md/Reference/TypeScript+API/requestUrl).

## Coding style

- [ ] Don't use `var`. Use `let` or `const` instead. [Learn more](https://javascript.plainenglish.io/4-reasons-why-var-is-considered-obsolete-in-modern-javascript-a30296b5f08f).
- [ ] Don't use the global `app` instance. Use `this.app` provided to your plugin instance instead. [Learn more](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Avoid%20using%20global%20app%20instance).
- [ ] Do break up your `main.ts` into smaller files or even folders if it gets big to make code easier to find.
- [ ] Do use `async` and `await` when you can for readability, instead of using `Promise`. [Learn more](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Prefer+async%2Fawait+over+Promise).
- [ ] Don't use global variables. Try to keep variables either in the scope of classes or functions. [Learn more](http://wiki.c2.com/?GlobalVariablesAreBad).
- [ ] Do test with `instanceof` before casting into other types such as `TFile`, `TFolder`, or `FileSystemAdapter`.
- [ ] Don't use use `as any` and use proper typing instead.

## Security

- [ ] Do [disclose relevant information](https://docs.obsidian.md/Developer+policies#Disclosures) in your README file (payments, account requirements, network use, external file access, ads, telemetry with privacy policy, closed source code).
- [ ] Do be mindful of all dependencies you add to your plugin. Remember that [less is safer](https://obsidian.md/blog/less-is-safer/). 
- [ ] Do not include any client-side telemetry. Libraries that offer usage tracking and metrics will often collect information that users could consider sensitive.
- [ ] Do commit and use a lock file (package-lock.json, pnpm-lock.yaml, or yarn.lock) when using a package manager (npm, pnpm, or yarn).

## API usage

- [ ] Don't use `Vault.modify`. If you want to edit the active file, prefer using the `Editor` interface. If you want to edit it in the background, use `Vault.process`.
- [ ] Don't manually read and write frontmatter. Instead, use `FileManager.processFrontMatter`. [Learn more](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Prefer+%60FileManager.processFrontMatter%60+to+modify+frontmatter+of+a+note).
- [ ] Don't use `vault.delete` to delete files. Use `trashFile` instead to make sure the file is deleted according to the users preferences. [Learn more](https://docs.obsidian.md/Reference/TypeScript+API/FileManager/trashFile).
- [ ] Don't use the `Adapter` API whenever possible. Use `Vault` API instead. [Learn more](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Prefer+the+Vault+API+over+the+Adapter+API).
- [ ] Don't manage reading and write plugin data yourself. Use `Plugin.loadData()` and `Plugin.saveData()` instead.
- [ ] Do use `normalizePath()` if you take user defined paths. [Learn more](https://docs.obsidian.md/Reference/TypeScript+API/normalizePath).


## Performance

- [ ] Do optimize your plugin's load time. [[Optimize plugin load time|See guide]].
- [ ] Don't iterate all files to find a file or folder by its path. [Learn more](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Avoid+iterating+all+files+to+find+a+file+by+its+path).
- [ ] If you want your plugins to be compatible with Obsidian 1.7.2+, update your plugin to work with `DeferredViews`. [[Defer views|See guide]].
- [ ] If you're using `moment`, make sure you're doing `import { moment} from 'obsidian'` so that you don't import another copy.
- [ ] Do minimize your `main.js` for releasing.
- [ ] Do your initial UI setup on `workspace.onLayoutReady()` instead of in the constructor or `onload()` function. [Learn more](https://docs.obsidian.md/Plugins/Guides/Optimizing+plugin+load+time#If+you+have+code+that+you+want+to+run+at+startup%2C+where+should+it+go%3F).

## User interface

- [ ] Don't use setting headings unless you have more than one section. [Learn more](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Only+use+headings+under+settings+if+you+have+more+than+one+section).
- [ ] Don't include the word "setting" or "option" in setting headings. [Learn more](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Avoid+%22settings%22+in+settings+headings).
- [ ] Do use sentence case in all text in UI elements to be consistent with rest of Obsidian UI. [Learn more](https://en.wiktionary.org/wiki/sentence_case).
- [ ] Don't use `<h1>` or `<h2>` for setting header. Use Obsidian API instead. [Learn more](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Use+%60setHeading%60+instead+of+a+%60%3Ch1%3E%60%2C+%60%3Ch2%3E%60).
- [ ] Don't do `console.log` unless they are absolutely necessarily. Remove testing console logs that are not needed for production.
