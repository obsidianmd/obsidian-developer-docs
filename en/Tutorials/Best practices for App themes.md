## Overview

Most Obsidian UI elements are abstracted into [[App CSS variables]]. Variables make it possible to create expressive themes with low specificity in your CSS selectors. Most themes should be able to completely customize the interface by only targeting `body` for interface styling, and `.theme-light`/`.theme-dark` for colors.

If you are developing a complex theme, consider simplifying your selectors and using the built-in CSS variables to do the heavy lifting.

## Future-proofing your theme

As new versions of Obsidian are released, new interface patterns and design tweaks may affect your theme. You can minimize maintenance work by following these best practices.

- Use [[App CSS variables]] rather than 
- Use low-specificity selectors
- Keep it simple

The most common source of issues comes from broken selectors. New versions of Obsidian may introduce changes in classes and nesting of elements which may break selectors in your theme.

## Keep resources local

Obsidian is designed to be used with local files, and prioritizes user privacy. It's important to consider that Obsidian can be used offline, and therefore you should avoid loading remote resources such as fonts and images.

## Plugin compatibility

- Compatibility with plugins and snippets
	- Avoid `!important` declarations
