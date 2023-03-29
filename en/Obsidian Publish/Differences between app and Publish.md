### Obsidian App and Obsidian Publish are different contexts

Obsidian Publish shares common code and UI principles with Obsidian App, but also has some important differences that you should consider when creating themes. A few rules of thumb to keep in mind:

- Avoid complex selectors, use the available CSS variables instead.
- Avoid including CSS selectors and rules that are specific to Obsidian App.
- Keep CSS file size small so it loads fast for visitors.
- Consider compatibility across browsers and screen sizes.

### App-specific and Publish-specific CSS rules

While Obsidian App and Obsidian Publish share some common code, most App themes are designed to target CSS classes that are not present in the Publish context. For this reason, we recommend building Publish themes from the ground up, to minimize the amount of unnecessary code.