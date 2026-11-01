---
aliases:
  - Private API
  - Internal API
---
The type definitions in the [obsidian](https://github.com/obsidianmd/obsidian-api) package, `obsidian.d.ts`, are the public API for plugins. At runtime, Obsidian's objects have many more methods and properties than the type definitions declare. Everything that isn't declared there is private API, sometimes called internal or undocumented API.

The two come with different promises, and knowing them helps you decide how much risk your plugin takes on for its users.

## Public API

Once an API is public, Obsidian keeps it working for as long as possible, and keeps it backward compatible even when that makes a bug fix or a new feature harder. Accidental breakage is still possible, but it's treated as a bug.

When a public API has to change, Obsidian deprecates it first. Refer to [[#Deprecation]].

## Private API

Private API exists to implement Obsidian itself, and it can change or disappear in any release, without notice, whenever that's needed to fix a bug or to add a feature. It can also differ between desktop and mobile.

Before a change that might break plugins, the Obsidian team tries to find the plugins that use the API, for example by searching GitHub, and may open issues in their repositories. That's a courtesy, not a guarantee: the search can miss your plugin, and you may not be around to update it in time.

When a private API changes, it's your users who end up with a broken workflow, often until you release a fix. If a plugin that relies on private API is no longer maintained, it stays broken.

If your plugin needs something that only private API provides:

- Look for a public API that does the job first, even if it takes more code.
- Keep each use of private API in one place, so that a change in Obsidian needs a fix in one place.
- Check that what you use exists before you call it, and let your plugin keep working, with that feature turned off, when it doesn't.
- Test your plugin with each new Obsidian release, on desktop and on mobile.
- Ask for a public API in [Developers & API](https://forum.obsidian.md/c/developers-api/14) on the forum, and explain your use case.

## Deprecation

Obsidian deprecates a public API in up to three steps:

1. **Marked as deprecated.** The type definitions mark the API with the `@deprecated` tag, and most editors show it with strikethrough text. The API usually keeps working for the foreseeable future. Move to its replacement when it's convenient.
2. **Removed from the type definitions.** The API still exists at runtime, so released plugins keep working, but code that uses it no longer compiles. You find out the next time you build your plugin, and you have time to migrate before anything breaks for your users. For example, the global `app` object is no longer in the type definitions. Refer to [[Plugin guidelines#Avoid using global app instance]].
3. **Removed.** The API no longer exists, and plugins that use it break straight away. Obsidian rarely does this, and when it does, it's for an API that few plugins use, or for one that was removed from the type definitions a while ago.

To see each step as it happens, keep the `obsidian` package in your plugin up to date, and check your plugin for deprecated APIs.

Don't add a removed API back by declaring it in your own type definitions. Once it's out of the type definitions, it's private API, and it can be removed in any release.

## Plugins that change how Obsidian handles files

Obsidian doesn't accept plugins into the community directory that hook into how it handles the file system, for example to make hidden files and folders visible in the vault. Obsidian Sync and other features rely on that handling, and a plugin of this kind has broken Obsidian Sync and similar services before.

To work with files, use the [[Plugins/Vault|Vault]] API. To read a file that the Vault API doesn't see, such as one in the config folder, use the [[DataAdapter|Adapter]] API. Refer to [[Plugin guidelines#Prefer the Vault API over the Adapter API]].
