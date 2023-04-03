---
cssClass: reference
---

Obsidian follows operating system conventions for cursors. This means that the `pointer` cursor is only used when hovering over links. Avoid using the `pointer` cursor for buttons and interactive elements.

- Use `--cursor` variable to follow system conventions
- Use `--cursor-link` for links

### Theming variables

Variables for [[Cursor|cursors]] used in the app. Note that in the app context, Obsidian follows operating system conventions for cursors, not web conventions. This means interactive elements use the default arrow cursor (not the pointer). The pointer cursor is only used for links.

| Variable        | Default value | Description                     |
| --------------- | ------------- | ------------------------------- |
| `--cursor`      | `default`     | Cursor for interactive elements |
| `--cursor-link` | `pointer`     | Cursor for links                |
