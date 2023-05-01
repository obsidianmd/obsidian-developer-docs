This page lists extends the [[Developer policies]] with plugin-specific requirements that all plugins must follow to be published.

## Only use `fundingUrl` to link to services for financial support

Use [[Manifest#fundingUrl|fundingUrl]] if you accept financial support for your plugin, using services like Buy Me A Coffee or GitHub Sponsors.

If you don't accept donations, remove `fundingUrl` from your manifest.

## Keep plugin descriptions short and simple

Good plugin descriptions help users understand your plugin quickly and succinctly. Good descriptions often start with an action statement such as:

- "Translate selected text into..."
- "Generate notes automatically from..."
- "Import notes from..."
- "Sync highlights and annotations from..."
- "Open links in..."

Avoid starting your description with "This is a plugin", because it'll be obvious to users in the context of the Community Plugins directory.

Your description should:

- Follow the [Obsidian style guide](https://help.obsidian.md/Contributing+to+Obsidian/Style+guide).
- Have 250 characters maximum.
- End with a period `.`.
- Avoid using emoji or special characters.
- Use correct capitalization for acronyms, proper nouns and trademarks such as "Obsidian", "Markdown", "PDF". If you are not sure how to capitalize a term, refer to its website or Wikipedia description.

## Node.js and Electron APIs are only allowed on desktop

The Node.js and Electron APIs are only available in the desktop version of Obsidian. For example, Node.js packages like `fs`, `crypto`, and `os`, are only available on desktop.

If your plugin uses any of these APIs, you **must** set `isDesktopOnly` to `true` in the `manifest.json`.

> [!tip]
> Many Node.js features have Web API alternatives:
>
> - [`SubtleCrypto`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) instead of [`crypto`](https://nodejs.org/api/crypto.html).
> - `navigator.clipboard.readText()` and `navigator.clipboard.writeText()` to access clipboard contents.

## Don't include the plugin ID in the command ID

Obsidian automatically prefixes command IDs with your plugin ID. You don't need to include the plugin ID yourself.
